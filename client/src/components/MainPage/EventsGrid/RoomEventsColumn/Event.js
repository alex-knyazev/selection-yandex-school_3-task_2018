import React, { Component } from 'react'
import { connect } from 'react-redux'

import edit from '../../../../assets/edit.svg'
import mentorAvatar from '../../../../assets/emoji1.svg';

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowEventToolTip: false
    }
  }

  calculateWidth = () => {
    const { startHour, endHour } = this.props.startAndEndHours;
    const { dataEvent } = this.props;
    let widthPercents = 0;
    const dateStart = new Date(dataEvent.dateStart);
    const dateEnd = new Date(dataEvent.dateEnd);
    let durationInHours = (dateEnd - dateStart) / 1000 / 60 / 60;
    widthPercents = durationInHours / (endHour - startHour) * 100;
    return widthPercents;
  }

  makeTimeText = () => {
    let {
      dateStart,
      dateEnd
    } = this.props.dataEvent;

    const addZeroIfNeed = (time) => time < 10 ? "0" + time : time;
    dateStart = new Date(dateStart);
    dateEnd = new Date(dateEnd);
    const hoursStart = addZeroIfNeed(dateStart.getHours());
    const minutesStart = addZeroIfNeed(dateStart.getMinutes());
    const hoursEnd = addZeroIfNeed(dateEnd.getHours());
    const minutesEnd = addZeroIfNeed(dateEnd.getMinutes());
    return hoursStart + ":" + minutesStart + " - " + hoursEnd + ":" + minutesEnd
  }

  handleEventClick = () => {
    this.setState({
      isShowEventToolTip: !this.state.isShowEventToolTip
    })
  }

  render() {
    const widthPercents = this.calculateWidth();
    let {
      title: titleEvent,
      room,
      mentorName,
      amountPeople
    } = this.props.dataEvent;
    let time = this.makeTimeText();
    return (
      <div
        className="event"
        style={{ flexBasis: widthPercents + "%" }}
        onClick={this.handleEventClick}
        onMouseOut={this.hideEventInfo}
      >
        {
          this.state.isShowEventToolTip
            ?
            <div className="eventToolTipParent">
              <div className="eventTooltip">
                <div className="triangleBorder"></div>
                <div className="editEventButton">
                  <img alt="edit event" src={edit} />
                </div>
                <div className="eventInfo">
                  <h1>{titleEvent}</h1>
                  <p>{time}  &#183; {room.title} </p>
                  <p>
                    <img alt="mentor avatar" src={mentorAvatar} className="mentorAvatar" />
                    <span className="mentorName">{mentorName} </span>
                    <span className="amountPeople"> и {amountPeople} участников</span>
                  </p>
                </div>
              </div>
            </div>
            :
            null 
        }
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
