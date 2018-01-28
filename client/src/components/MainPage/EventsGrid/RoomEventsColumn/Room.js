import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextTruncate from 'react-text-truncate';
import classNames from 'classnames';
import { addFreeTimeBetweenRanges } from 'add-free-time-between-ranges'

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
    const { startHour, endHour } = this.props.startAndEndHours;
    const roomEventsWithFreeTime = addFreeTimeBetweenRanges({
      rangeDateStart: new Date(new Date().setHours(startHour, 0, 0, 0)),
      rangeDateEnd: new Date(new Date().setHours(endHour, 0, 0, 0)),
      timeSlots: eventsData,
      isSplitByHour: true
    })
    let eventsElements = [];
    const roomId = this.props.roomData.id;
    const roomTitle = this.props.roomData.title;
    const floorTitle = this.props.roomData.floor + ' этаж';
    let isFreeTimeInRoom = false;
    for (let i = 0; i < roomEventsWithFreeTime.length; i++) {
      const timeItem = roomEventsWithFreeTime[i];
      if (timeItem.isFree) {
        isFreeTimeInRoom = true;
        const freeSlots = timeItem.freeSlots;
        for (let y = 0; y < freeSlots.length; y++) {
          const freeSlot = freeSlots[y];
          const {
            durationInHours,
            freeSlotDateStart,
            freeSlotDateEnd,
          } = freeSlot;
          const widthPercents = durationInHours / (endHour - startHour) * 100;
          eventsElements.push(
            <EmptyTime
              key={"empty_time_" + i + "_" + y}
              widthPercents={widthPercents}
              emptyTimeStart={freeSlotDateStart}
              emptyTimeEnd={freeSlotDateEnd}
              roomId={roomId}
              roomTitle={roomTitle}
              floorTitle={floorTitle}
            />
          )
        }
      }
      else {
        eventsElements.push(
          <Event
            key={"event" + i + "_" + timeItem.title}
            eventData={timeItem}
            floorTitle={floorTitle}
          />
        )
      }
    }
    let isFullBusy = !isFreeTimeInRoom;
    return { eventsElements, isFullBusy }
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
          style={isRoomInfoHidden ? { transform: 'translate(' + (scrollLeftPixels + 'px)') } : {}}
        >
          <div className="roomInfoName">
            {!isRoomInfoHidden
              ?
              <TextTruncate
                line={1}
                truncateText="…"
                text={title}
              />
              : <span>{title} </span>
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