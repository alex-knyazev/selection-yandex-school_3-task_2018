const getDatabaseData = require('./getDatabaseData');
const Moment = require('moment');
const MomentRange = require('moment-range')
const addFreeTimeBetweenRanges =  require('add-free-time-between-ranges').addFreeTimeBetweenRanges;
const START_HOUR = 8;
const END_HOUR = 23;


const moment = MomentRange.extendMoment(Moment);

class RoomForAnalyze {
  constructor(room, events) {
    this.id = room.id
    this.title = room.title;
    this.capacity = room.capacity;
    this.floor = room.floor;
    this.events = this.sortByDate(events);
  }

  sortByDate(events) {
    const sortedEvents = events.sort((event1, event2) => ( 
      new Date(event1.dateStart) - new Date(event2.dateStart)
    ))
    return sortedEvents;
  }


  checkIfSuit(amountPeople) {
    return this.capacity >= amountPeople && !this.events.length
  }

  findRate(args) {
    const { 
      dateStart, 
      dateEnd,
      usersInEvent 
    } = args;
    const capacityRate = this.capacity - usersInEvent.length;
    let usersAverageFloor =  usersInEvent.reduce(function(sum, current) {
      return sum + current.homeFloor;
    }, 0) / usersInEvent.length;
    if(!usersAverageFloor) {
      usersAverageFloor = this.floor;
    }
    const floorRate = Math.abs(this.floor - usersAverageFloor);
    const rate = capacityRate + floorRate +  (Math.abs(capacityRate - floorRate)/100)
    this.rate = rate;;
  }

}

const findRecommendationRooms = async (req, res) => {
  const query = req.body.query;
  const {
    dateStart,
    dateEnd,
    usersIds
  } = query;

  const {
    users,
    rooms, 
    events
  } = await getDatabaseData(query);

  const eventsInThisTime = {};
  for(let i = 0; i < events.length; i++) {
    const eventRoom = events[i].room.id; 
    const eventDate = moment(events[i].dateStart).startOf('day');
    const range1 = moment.range(new Date(dateStart), new Date(dateEnd));
    const range2 = moment.range(new Date(events[i].dateStart), new Date(events[i].dateEnd))
    const isOverlap = range1.overlaps(range2, {adjacent : true});  
    if(isOverlap) {
      if(!eventsInThisTime[eventRoom]) {
        eventsInThisTime[eventRoom] = [events[i]];
      }
      else {
        eventsInThisTime[eventRoom].push(events[i]);
      }
    }
  }

  let suitedRooms = [];
  for(let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    let events = eventsInThisTime[room.id];
    if(!events) {
      events = [];
    }
    const roomForAnalyze = new RoomForAnalyze(room, events);
    const isRoomSuit = roomForAnalyze.checkIfSuit(usersIds.length);
    if(isRoomSuit) {
      const usersInEvent = findUsersFloors(usersIds, users);
      roomForAnalyze.findRate({ dateStart, dateEnd, usersInEvent });
      suitedRooms.push(roomForAnalyze);
    }
  }

  res.send({
    data: {
      suitedRooms: suitedRooms.sort((room1, room2) => room1.rate - room2.rate)
    }
  });

}

function findUsersFloors(usersIds, users) {
  return users.filter((user) => {
    return usersIds.find((id) => id == user.id )
  })
}

module.exports.findRecommendationRooms = findRecommendationRooms;