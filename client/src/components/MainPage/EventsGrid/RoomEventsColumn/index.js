import React, { Component } from 'react';

import Floor from './Floor';

import './roomEventsColumn.css'

import testDataFloors from '../../../../testData/testDataFloors'

class RoomEventsColumn extends Component {

  makeFloors = () => {
    let floorsElements = []
    for (let i = 0; i < testDataFloors.length; i++) {
      const floor = testDataFloors[i];
      floorsElements.push(
        <Floor
          key={floor.title + "_" + i}
          data={floor}
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