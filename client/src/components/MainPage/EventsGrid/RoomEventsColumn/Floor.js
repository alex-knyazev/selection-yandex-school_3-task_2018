import React, { Component } from 'react'

import Room from './Room';

import testDataEvents from './../../../../testData/testDataEvents'

export default class Floor extends Component {

  makeRooms = () => {
    const { rooms } = this.props.data;
    let roomsElements = [];
    for (let i = 0; i < rooms.length; i++) {
      const events = this.findEventsInRoom(rooms[i])
      roomsElements.push(
        <Room
          key={rooms[i].title + "_" + i}
          dataRoom={rooms[i]}
          dataEvents={events}
        />
      )
    }
    return roomsElements;
  }

  findEventsInRoom = (room) => {
    let events= [];
    for (let i = 0; i < testDataEvents.length; i++) {
      const event = testDataEvents[i];
      if(event.room.title === room.title) {
        events.push(event);
      }
    }
    return events;
  }

  render() {
    const { title } = this.props.data;
    const rooms = this.makeRooms()
    return (
      <div className="floor">
        <div className="floorInfo">
          <div className="floorName">
            {title}
          </div>
        </div>
        {rooms}
      </div>
    )
  }
}
