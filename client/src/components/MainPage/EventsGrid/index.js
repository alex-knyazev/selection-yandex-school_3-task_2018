import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PacmanLoader} from 'react-spinners';

import getEventsByFloors from '../../../actions/server-actions/events/getByFloors';

import RoomEventsColumn from './RoomEventsColumn';
import GridTimeColumn from './GridTimeColumn';

class EventsGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      eventsByFloors: {}
    }
  }

  componentWillMount = () => {
    this.props.getEventsByFloors(this.props.selectedDate);
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.selectedDate !== this.props.selectedDate) {
      this.props.getEventsByFloors(nextProps.selectedDate);
      return;
    }
    if (Object.keys(nextProps.eventsByFloors).length) {
      this.setState({
        eventsByFloors: nextProps.eventsByFloors,
        isLoading: false
      })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <PacmanLoader
          color={'#f6f5f9'}
          loading={true}
        />
      )
    }
    else {
      return (
        <div className="eventsGrid">
          <RoomEventsColumn eventsByFloors={this.state.eventsByFloors} />
          <GridTimeColumn />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  eventsByFloors: state.eventsOnFloors,
  selectedDate: state.selectedDate
})

const mapDispatchToProps = {
  getEventsByFloors: getEventsByFloors
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsGrid);