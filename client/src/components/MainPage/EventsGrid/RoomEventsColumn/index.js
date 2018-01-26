import React, { Component } from 'react';

import Floor from './Floor';

import './index.css'

const RoomEventsColumn = (props) => {

  const makeFloors = () => {
    let floorsElements = [];
    for (let floor in props.eventsByFloors) {
      floorsElements.push(
        <Floor
          key={floor + "_floor"}
          title={floor + " этаж"}
          rooms={props.eventsByFloors[floor]}
        />
      )
    }
    return floorsElements;
  }

  const floors = makeFloors();
  return (
    <div className="roomEventsColumn">
      <div className="floors">
        {floors}
      </div>
    </div>
  )
}

export default RoomEventsColumn;