import React, { Component } from 'react';

import EventsGrid from './EventsGrid';
import DateAndHours from './DateAndHours'

import './index.css';

const MainPage = () => {
  return (
    <div>
      <Schedule />
    </div>
  )
}

const Schedule = () => {
  return (
    <div className="schedule">
      <DateAndHours />
      <EventsGrid />
    </div>
  )
}

export default MainPage;







