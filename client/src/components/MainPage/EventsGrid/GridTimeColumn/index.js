import React, { Component } from 'react';
import { connect } from 'react-redux'

import HourColumn from './HourColumn'

import './gridTimeColumn.css'

import { setScheduleHeight } from '../../../../actions/scheduleHeight'

class GridTimeColumn extends Component {

  findScheduleHeight = (e) => {
    const scheduleHeight = e.clientHeight;
    this.props.setScheduleHeight(scheduleHeight);
  }

  makeHoursGrid = () => {
    const { startHour, endHour } = this.props.startAndEndHours;
    let hoursColumns = [];
    for (let i = startHour; i <= endHour + 1; i++) {
      hoursColumns.push(
        <HourColumn key={"hour_" +i} hours={{startHour: i-1, endHour: i }} />
      )
    }
    return hoursColumns;
  }

  render() {
    const hoursGrid = this.makeHoursGrid();
    return (
      <div className="gridTimeColumn" ref={this.findScheduleHeight}>
        {hoursGrid}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  startAndEndHours: state.startAndEndHours
})

const mapDispatchToProps = {
  setScheduleHeight: setScheduleHeight,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridTimeColumn);