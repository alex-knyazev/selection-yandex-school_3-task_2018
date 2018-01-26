import React, { Component } from 'react';

import Room from './Room';

const Floor = (props) => {

  const makeRooms = () => {
    const { rooms } = props;
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

  const { title } = props;
  const rooms = makeRooms()
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

export default Floor;
