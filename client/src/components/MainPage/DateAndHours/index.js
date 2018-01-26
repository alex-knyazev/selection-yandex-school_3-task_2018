import React, { Component } from 'react'

import DateColumn from './DateColumn'
import HoursColumn from './HoursColumn'

import './index.css'

const DateAndHours = () => {
  return (
    <div className="dateAndHours">
      <DateColumn />
      <div className="emptyWhite"></div>
      <HoursColumn />
    </div>
  )
}

export default DateAndHours;
