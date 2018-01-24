import React, { Component } from 'react';

import Room from './Room';

export default class Floor extends Component {

  makeRooms = () => {
    const { rooms } = this.props;
    let roomsElements = [];
    for (let i = 0; i < rooms.length; i++) {
      roomsElements.push(
        <Room
          key={rooms[i].title + "_" + i}
          roomData={rooms[i]}
        />
      )
    }
    return roomsElements;
  }

  render() {
    const { title } = this.props;
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
