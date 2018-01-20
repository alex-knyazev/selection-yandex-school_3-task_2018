import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextTruncate from 'react-text-truncate';
import classNames from 'classnames';

import Event from './Event';
import EmptyTime from './EmptyTime';

class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRoomInfoHidden: false,
      scrollLeft: 0
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    var scrollLeft = window.pageXOffset;
    this.setState({
      scrollLeftPixels: scrollLeft
    })
  }

  handleScroll = (e) => {
    var scrollLeft = window.pageXOffset;
    if (scrollLeft > 184 && !this.state.isRoomInfoHidden) {
      this.setState({
        isRoomInfoHidden: true,
        scrollLeftPixels: scrollLeft
      })
    }
    else if (scrollLeft < 184 && this.state.isRoomInfoHidden) {
      this.setState({
        isRoomInfoHidden: false,
        scrollLeftPixels: scrollLeft
      })
    }
    else {
      this.setState({
        scrollLeftPixels: window.pageXOffset
      })
    }
  }

  makeEventsElements = () => {
    const dataEvents = this.props.dataEvents;
    let eventsElements = [];
    let isFullBusy = true;
    if (!dataEvents.length) {
      eventsElements.push(
        <EmptyTime
          key={"full_empty_time"}
          widthPercents={100}
        />
      )
      isFullBusy = false;
    }
    //we assume that events of room are sorted by date
    for (let i = 0; i < dataEvents.length; i++) {
      const event = dataEvents[i];
      let {
        leftInsert,
        rightInsert,
        emptyTimeStart,
        emptyTimeEnd
      } = this.calculateEmptyTime(event, i);
      if (leftInsert) {
        eventsElements.push(
          <EmptyTime
            key={"left_empty_time_" + i + "_" + event.title}
            widthPercents={leftInsert}
            emptyTimeStart={emptyTimeStart}
            emptyTimeEnd={emptyTimeEnd}
          />
        )
        isFullBusy = false;
      }
      eventsElements.push(
        <Event
          key={"event" + i + "_" + event.title}
          dataEvent={event}
          emptyTimeStart={emptyTimeStart}
          emptyTimeEnd={emptyTimeEnd}
        />
      )
      if (rightInsert) {
        eventsElements.push(
          <EmptyTime
            key={"right_empty_time_" + i + "_" + event.title}
            widthPercents={rightInsert}
            emptyTimeStart={emptyTimeStart}
            emptyTimeEnd={emptyTimeEnd}
          />
        )
        isFullBusy = false;
      }
    }
    return { eventsElements, isFullBusy }
  }

  calculateEmptyTime = (event, index) => {
    const { startHour, endHour } = this.props.startAndEndHours;
    const dataEvents = this.props.dataEvents;
    const emptyTime = {
      leftInsert: null,
      rightInsert: null,
      emptyTimeStart: null,
      emptyTimeEnd: null
    }
    const eventDateStart = new Date(event.dateStart);
    const eventDateEnd = new Date(event.dateEnd);
    if (index === 0) {
      const dayDateStart = new Date(new Date(event.dateStart).setHours(startHour, 0, 0))
      if (eventDateStart > dayDateStart) {
        let durationInHours = (eventDateStart - dayDateStart) / 1000 / 60 / 60;
        emptyTime.leftInsert = durationInHours / (endHour - startHour) * 100;
        emptyTime.emptyTimeStart = dayDateStart;
        emptyTime.emptyTimeEnd = eventDateStart;
      }
    }
    else {
      const previousEvent = dataEvents[index - 1];
      const {
        dateEnd: dateEndPr,
      } = previousEvent;
      const previousEventDateEnd = new Date(dateEndPr);
      if (dateEndPr !== eventDateStart) {
        let durationInHours = (eventDateStart - previousEventDateEnd) / 1000 / 60 / 60;
        emptyTime.leftInsert = durationInHours / (endHour - startHour) * 100;
        emptyTime.emptyTimeStart = previousEventDateEnd;
        emptyTime.emptyTimeEnd = eventDateStart;
      }
    }

    if (index === dataEvents.length - 1) {
      const dayDateEnd = new Date(new Date(event.dateEnd).setHours(endHour, 0, 0))
      if (eventDateEnd < dayDateEnd) {
        let durationInHours = (dayDateEnd - eventDateEnd) / 1000 / 60 / 60;
        emptyTime.rightInsert = durationInHours / (endHour - startHour) * 100;
        emptyTime.emptyTimeStart = eventDateEnd;
        emptyTime.emptyTimeEnd = dayDateEnd;
      }
    }

    return emptyTime;
  }

  render() {
    const { title, capacity } = this.props.dataRoom;
    const { isRoomInfoHidden, scrollLeftPixels } = this.state;
    const { eventsElements, isFullBusy } = this.makeEventsElements();
    let roomClasses = classNames({
      'room': true,
      'fullBusyRoom': isFullBusy
    });
    let roomInfoClasses = classNames({
      'roomInfo': true,
      'roomInfoHidden': isRoomInfoHidden
    });
    let roomScheduleWrapperClasses = classNames({
      'roomSceduleWrapper': true,
      'roomScheduleWrapperScrolled': isRoomInfoHidden
    });
    return (
      <div className={roomClasses}>
        <div
          className={roomInfoClasses}
          style={isRoomInfoHidden ? { transform: 'translate('+(scrollLeftPixels + 'px)' )} : {}}
        >
          <div className="roomInfoName">
            {!isRoomInfoHidden
              ?
              <TextTruncate
                line={1}
                truncateText="…"
                text={title}
              />
              : <span>{ title } </span>
            }

          </div>
          {!isRoomInfoHidden
            ?
            <div className="roomInfoCapacity">{capacity}</div>
            : null
          }

        </div>
        <div className={roomScheduleWrapperClasses}>
          <div className="roomSchedule">
            {eventsElements}
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  startAndEndHours: state.startAndEndHours
})

export default connect(
  mapStateToProps
)(Room);