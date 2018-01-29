import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import makeTimeText from '../../../../utils/makeTimeText'

import EventTooltip from './EventTooltip';

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowEventToolTip: false,
      isRedirectToEditEvent: false
    }
    this.handleEditEventClick = this.handleEditEventClick.bind(this); 
  }

  calculateWidth = () => {
    const { startHour, endHour } = this.props.startAndEndHours;
    const { eventData } = this.props;
    let widthPercents = 0;
    const dateStart = new Date(eventData.dateStart);
    const dateEnd = new Date(eventData.dateEnd);
    let durationInHours = (dateEnd - dateStart) / 1000 / 60 / 60;
    widthPercents = durationInHours / (endHour - startHour) * 100;
    return widthPercents;
  }

  handleEventClick = () => {
    this.setState({
      isShowEventToolTip: !this.state.isShowEventToolTip
    })
  }

  handleEditEventClick = () => {
    this.setState({
      isRedirectToEditEvent: true
    })
  }
  
  render() {
    if (this.state.isRedirectToEditEvent) {
      return (
        <Redirect to={{
          pathname: "/editEvent",
          state: Object.assign(this.props.eventData, {floorTitle: this.props.floorTitle})
        }}
        />
      )
    }
    const widthPercents = this.calculateWidth();
    let {
      title,
      room,
      users,
      dateStart,
      dateEnd
    } = this.props.eventData;
    const amountPeople = users.length
    const mentor = users[0];
    let time = makeTimeText([dateStart, dateEnd]);
    return (
      <div
        className="event"
        style={{ flexBasis: widthPercents + "%" }}
        onClick={this.handleEventClick}
        onMouseOut={this.hideEventInfo}
      >
        <EventTooltip 
          isShowEventToolTip={this.state.isShowEventToolTip}
          amountPeople={amountPeople}
          mentor={mentor}
          time={time}
          room={room}
          title={title}
          handleEditEventClick={this.handleEditEventClick}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  startAndEndHours: state.startAndEndHours
})

export default connect(
  mapStateToProps
)(Event);
