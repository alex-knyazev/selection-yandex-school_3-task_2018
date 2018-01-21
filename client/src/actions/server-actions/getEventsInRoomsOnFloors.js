export const EVENTS_IN_ROOMS_ON_FLOORS = "EVENTS_IN_ROOMS_ON_FLOORS";

const query = `{ 
	rooms {
    id
    title
    capacity
    floor
  }
  events {
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

export default function getEventsInRooms() {
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
        const eventsInRoomsOnFloors = findEventsInRoomsOnFloors(response);
        dispatch({
          type: EVENTS_IN_ROOMS_ON_FLOORS,
          eventsInRoomsOnFloors
        })
      });
  }
}

const findEventsInRoomsOnFloors = ({data}) => {
  const rooms = data.rooms;
  const events = data.events;
  let floorsWithRooms = {};
  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i];
    const eventsInRoom = findEventsInRoom(room, events);
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

const findEventsInRoom = (room, events) => {
  let eventsInRoom = [];
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const roomId = event.room.id;
    if(roomId === room.id) {
      eventsInRoom.push(event);
    }
  }
  return eventsInRoom
}

