import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BounceLoader} from 'react-spinners';

import RoomEventsColumn from './RoomEventsColumn';
import GridTimeColumn from './GridTimeColumn';

import getEventsInRoomsOnFloors from '../../../actions/server-actions/getEventsInRoomsOnFloors';

class EventsGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      eventsInRoomsOnFloors: {}
    }
  }

  componentWillMount = () => {
    this.props.getEventsInRoomsOnFloors();
  }

  componentWillReceiveProps = (nextProps) => {
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
        <BounceLoader
          color={'#ff0000'}
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
  eventsInRoomsOnFloors: state.eventsInRoomsOnFloors
})

const mapDispatchToProps = {
  getEventsInRoomsOnFloors: getEventsInRoomsOnFloors
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsGrid);