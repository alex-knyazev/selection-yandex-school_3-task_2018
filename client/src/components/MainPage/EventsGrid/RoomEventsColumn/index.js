import React, { Component } from 'react';

import Floor from './Floor';

import './roomEventsColumn.css'

class RoomEventsColumn extends Component {
  makeFloors = () => {
    let floorsElements = [];
    for(let floor in this.props.eventsInRoomsOnFloors) {
      floorsElements.push(
        <Floor
          key={floor + "_floor"}
          title={floor + " этаж"}
          rooms={this.props.eventsInRoomsOnFloors[floor]}
        />
      )
    }
    return floorsElements;
  }

  render() {
    const floors = this.makeFloors();
    return (
      <div className="roomEventsColumn">
        <div className="floors">
          {floors}
        </div>
      </div>
    )
  }
}

export default RoomEventsColumn;