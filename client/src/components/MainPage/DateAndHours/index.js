import React, { Component } from 'react'

import DateColumn from './DateColumn';
import HoursColumn from './HoursColumn';

import './dateAndHours.css'

export default class DateEndHours extends Component {
  render() {
    return (
      <div className="dateAndHours">
        <DateColumn />
        <div className="emptyWhite"></div>
        <HoursColumn />
        
      </div>
    )
  }
}
