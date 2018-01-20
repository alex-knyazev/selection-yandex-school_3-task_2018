import React, { Component } from 'react';

import EventsGrid from './EventsGrid';
import DateAndHours from './DateAndHours'

import './mainPage.css';


export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Schedule />
      </div>
    )
  }
}

class Schedule extends Component {

  render() {
    return (
      <div className="schedule">
        <DateAndHours />
        <EventsGrid />
      </div>
    )
  }
}







