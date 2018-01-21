import React, { Component } from 'react'
import { connect } from 'react-redux'

class HoursColumn extends Component {

  makeHours = () => {
    const { startHour, endHour } = this.props.startAndEndHours;
    let hours = [];
    for (let i = startHour; i <= endHour; i++) {
      let hour = i;
      if (i === startHour) {
        hour = `${i}.00`
      }
      hours.push(
        <div key={ i +"_hour"} className="hour">
          {hour}
        </div>
      )
    }
    return hours;
  }

  render() {
    const hours = this.makeHours();
    return (
      <div className="hoursColumn">
        {hours}
        <CurrentTime 
          height={this.props.scheduleHeight}
          startAndEndHours={this.props.startAndEndHours}
        />
      </div>
    )
  }

}


class CurrentTime extends Component {
  constructor(props) {
    super(props)
    const now = new Date()
    this.state = {
      currentTime: now
    }
    this.updateCurrentTimeEveryMinute(now);
  }

  componentDidUpdate() {
    this.updateCurrentTimeEveryMinute(this.state.currentTime);
  }

  updateCurrentTimeEveryMinute = (now) => {
    const remainSeconds = 60 - now.getSeconds();
    setTimeout(function () {
      this.setState({ currentTime: new Date() });
    }.bind(this), remainSeconds * 1000)
  }

  getTimeCircleMargin = (hour, minutes) => {
    const { startHour, endHour } = this.props.startAndEndHours;
    let oneHourWidthPercent = 100/(endHour-startHour + 1);
    let hourMargin = (hour - startHour) * oneHourWidthPercent;
    let minutesMargin = (oneHourWidthPercent * (minutes/60));
    return hourMargin + minutesMargin;
  }

  getCurrentTime = (hour, minutes) => {
    let date = this.state.currentTime;
    hour = '' + date.getHours();
    if (hour.length === 1) {
      hour = '0' + hour;
    }
    minutes = '' + date.getMinutes();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    return `${hour}:${minutes}`;
  }

  render() {
    const { startHour, endHour } = this.props.startAndEndHours;
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();    
    if (hour -1  < startHour || hour >= endHour) {

      return null;
    }
    let currentTime = this.getCurrentTime(hour, minutes);
    let timeCircleMarginPercent = this.getTimeCircleMargin(hour, minutes);
    const heightOfCurrentTime = this.props.height + 30 + 'px';
    return (
      <div className="currentTime" style={{
        marginLeft: timeCircleMarginPercent + "%",
      }}>
        <div className="time">
          {currentTime}
        </div>
        <div className="timeLine" style={{height: heightOfCurrentTime}}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    scheduleHeight: state.scheduleHeight,
    startAndEndHours: state.startAndEndHours
})

export default connect(mapStateToProps)(HoursColumn);