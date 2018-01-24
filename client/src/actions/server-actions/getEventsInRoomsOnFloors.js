export const EVENTS_IN_ROOMS_ON_FLOORS = "EVENTS_IN_ROOMS_ON_FLOORS";

const query = `{ 
	rooms {
    id
    title
    capacity
    floor
  }
  events {
    id
    title
    dateStart
    dateEnd
    users {
      homeFloor
      avatarUrl
      id
      login
    }
    room {
      id
      title
    }
  }
}`;

export default function getEventsInRooms(date) {
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: JSON.stringify({
        query
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then((response) => {
        const eventsInRoomsOnFloors = findEventsInRoomsOnFloors(response, date);
        dispatch({
          type: EVENTS_IN_ROOMS_ON_FLOORS,
          eventsInRoomsOnFloors
        })
      });
  }
}

const findEventsInRoomsOnFloors = ({data}, date) => {
  const rooms = data.rooms;
  const events = data.events;
  let floorsWithRooms = {};
  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i];
    const eventsInRoom = findEventsInRoom(room, events, date);
    room.events = eventsInRoom;
    const floor = room.floor;
    if(floorsWithRooms[floor]) {
      floorsWithRooms[floor].push(room);
    }
    else {
      floorsWithRooms[floor] = [room];
    }
  }
  return floorsWithRooms;
}

const findEventsInRoom = (room, events, date) => {
  let eventsInRoom = [];
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if(new Date(event.dateStart).setHours(0,0,0,0) === new Date(date).setHours(0,0,0,0)) {
      const roomId = event.room.id;
      if(roomId === room.id) {
        eventsInRoom.push(event);
      }
    } 

  }
  return eventsInRoom
}

