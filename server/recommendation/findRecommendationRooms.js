const getDatabaseData = require('./getDatabaseData');
const moment = require('moment');

class RoomForAnalyze {
  constructor(room, roomEvents) {
    this.id = room.id
    this.title = room.title;
    this.capacity = room.capacity;
    this.floor = room.floor;
    this.roomEvents = this.sortByDate(roomEvents);
    this.freeTime = this.findFreeTime();
  }

  sortByDate(roomEvents) {
    
  }

  findFreeTime() {
    const roomEvents = this.roomEvents;

  }

  checkIfTimeIsFree({dateStart, dateEnd}) {
    const roomEvents = this.roomEvents;
    
  }

  findFreeTime()  {
    const roomEvents = this.roomEvents;
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
  const eventsByRooms = {};
  for(let i = 0; i < events.length; i++) {
    const eventRoom = events[i].room.id;
    if(!eventsByRooms[eventRoom]) {
      eventsByRooms[eventRoom] = [events[i]];
    }
    else {
      eventsByRooms[eventRoom].push(events[i]);
    } 
  }
  for(let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const roomForAnalyze = new RoomForAnalyze(room, eventsByRooms[room.id]);
    roomForAnalyze.checkIfTimeIsFree({dateStart, dateEnd})
  }
  res.send({data:22});
}

module.exports.findRecommendationRooms = findRecommendationRooms;