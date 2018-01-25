import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PacmanLoader} from 'react-spinners';

import getEventsInRoomsOnFloors from '../../../actions/server-actions/recommendations/get';

import RoomEventsColumn from './RoomEventsColumn';
import GridTimeColumn from './GridTimeColumn';

class EventsGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      eventsInRoomsOnFloors: {}
    }
  }

  componentWillMount = () => {
    this.props.getEventsInRoomsOnFloors(this.props.selectedDate);
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.selectedDate !== this.props.selectedDate) {
      this.props.getEventsInRoomsOnFloors(nextProps.selectedDate);
      return;
    }
    if (Object.keys(nextProps.eventsInRoomsOnFloors).length) {
      this.setState({
        eventsInRoomsOnFloors: nextProps.eventsInRoomsOnFloors,
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
          <RoomEventsColumn eventsInRoomsOnFloors={this.state.eventsInRoomsOnFloors} />
          <GridTimeColumn />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  eventsInRoomsOnFloors: state.eventsInRoomsOnFloors,
  selectedDate: state.selectedDate
})

const mapDispatchToProps = {
  getEventsInRoomsOnFloors: getEventsInRoomsOnFloors
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsGrid);