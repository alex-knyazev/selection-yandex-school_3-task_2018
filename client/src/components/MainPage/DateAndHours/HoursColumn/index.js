import React, { Component } from 'react'
import { connect } from 'react-redux'

import CurrentTime from './CurrentTime';

import './index.css'

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

const mapStateToProps = (state) => ({
    scheduleHeight: state.scheduleHeight,
    startAndEndHours: state.startAndEndHours
})

export default connect(mapStateToProps)(HoursColumn);