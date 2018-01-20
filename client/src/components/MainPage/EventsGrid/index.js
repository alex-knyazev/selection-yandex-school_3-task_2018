import React, { Component } from 'react';

import RoomEventsColumn from './RoomEventsColumn';
import GridTimeColumn from './GridTimeColumn';

class EventsGrid extends Component {
  render() {
    return (
      <div className="eventsGrid">
        <RoomEventsColumn />
        <GridTimeColumn/>
      </div>
    )
  }
}


export default EventsGrid;