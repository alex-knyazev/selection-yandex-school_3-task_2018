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
    const eventsData = this.props.roomData.events;
    const roomId = this.props.roomData.id;
    const roomTitle = this.props.roomData.title;
    const floorTitle = this.props.roomData.floor + ' этаж';
    const { startHour, endHour } = this.props.startAndEndHours;
    let eventsElements = [];
    let isFullBusy = true;
    if (!eventsData.length) {
      const dayDateStart = new Date(this.props.selectedDate.setHours(startHour, 0, 0));
      const dayDateEnd = new Date(this.props.selectedDate.setHours(endHour, 0, 0));
      eventsElements.push(
        <EmptyTime
          key={"full_empty_time"}
          widthPercents={100}
          emptyTimeStart={dayDateStart}
          emptyTimeEnd={dayDateEnd}
          roomId={roomId}
          roomTitle={roomTitle}
          floorTitle={floorTitle}
        />
      )
      isFullBusy = false;
    }
    //we assume that events of room are sorted by date
    for (let i = 0; i < eventsData.length; i++) {
      const event = eventsData[i];
      let {
        leftInsert,
        rightInsert,
      } = this.calculateEmptyTime(event, i);
      if (leftInsert) {
        eventsElements.push(
          <EmptyTime
            key={"left_empty_time_" + i + "_" + event.title}
            widthPercents={leftInsert.widthPercents}
            emptyTimeStart={leftInsert.emptyTimeStart}
            emptyTimeEnd={leftInsert.emptyTimeEnd}
            roomId={roomId}
            roomTitle={roomTitle}
            floorTitle={floorTitle}
          />
        )
        isFullBusy = false;
      }
      eventsElements.push(
        <Event
          key={"event" + i + "_" + event.title}
          eventData={event}
          floorTitle={floorTitle}
        />
      )
      if (rightInsert) {
        eventsElements.push(
          <EmptyTime
            key={"right_empty_time_" + i + "_" + event.title}
            widthPercents={rightInsert.widthPercents}
            emptyTimeStart={rightInsert.emptyTimeStart}
            emptyTimeEnd={rightInsert.emptyTimeEnd}
            roomId={roomId}
            roomTitle={roomTitle}
            floorTitle={floorTitle}
          />
        )
        isFullBusy = false;
      }
    }
    return { eventsElements, isFullBusy }
  }

  calculateEmptyTime = (event, index) => {
    const { startHour, endHour } = this.props.startAndEndHours;
    const eventsData = this.props.roomData.events;
    const emptyTime = {
      leftInsert: {},
      rightInsert: {},
    }
    const eventDateStart = new Date(event.dateStart);
    const eventDateEnd = new Date(event.dateEnd);
    if (index === 0) {
      const dayDateStart = new Date(new Date(event.dateStart).setHours(startHour, 0, 0))
      if (eventDateStart > dayDateStart) {
        let durationInHours = (eventDateStart - dayDateStart) / 1000 / 60 / 60;
        emptyTime.leftInsert.widthPercents = durationInHours / (endHour - startHour) * 100;
        emptyTime.leftInsert.emptyTimeStart = dayDateStart;
        emptyTime.leftInsert.emptyTimeEnd = eventDateStart;
      }
    }
    else {
      const previousEvent = eventsData[index - 1];
      const {
        dateEnd: dateEndPr,
      } = previousEvent;
      const previousEventDateEnd = new Date(dateEndPr);
      if (dateEndPr !== eventDateStart) {
        let durationInHours = (eventDateStart - previousEventDateEnd) / 1000 / 60 / 60;
        emptyTime.leftInsert.widthPercents = durationInHours / (endHour - startHour) * 100;
        emptyTime.leftInsert.emptyTimeStart = previousEventDateEnd;
        emptyTime.leftInsert.emptyTimeEnd = eventDateStart;
      }
    }

    if (index === eventsData.length - 1) {
      const dayDateEnd = new Date(new Date(event.dateEnd).setHours(endHour, 0, 0))
      if (eventDateEnd < dayDateEnd) {
        let durationInHours = (dayDateEnd - eventDateEnd) / 1000 / 60 / 60;
        emptyTime.rightInsert.widthPercents  = durationInHours / (endHour - startHour) * 100;
        emptyTime.rightInsert.emptyTimeStart = eventDateEnd;
        emptyTime.rightInsert.emptyTimeEnd = dayDateEnd;
      }
    }
    return emptyTime;
  }

  render() {
    const { title, capacity } = this.props.roomData;
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
          style={isRoomInfoHidden ? { transform: 'translate('+( scrollLeftPixels + 'px)' )} : {}}
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
            <div className="roomInfoCapacity">до {capacity} человек</div>
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
  startAndEndHours: state.startAndEndHours,
  selectedDate: state.selectedDate
})

export default connect(
  mapStateToProps
)(Room);