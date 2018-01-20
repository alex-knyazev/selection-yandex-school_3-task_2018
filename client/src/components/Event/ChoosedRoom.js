import React, { Component } from 'react'

import clearButtonImg from './../../assets/close-white.svg';

export default class ChoosedRoom extends Component {
  render() {
    return (
      <div>
        <span className="inputName">Ваша переговорка</span>
        <div className="eventInfo">
          <div>
            <div><b>16:00 &mdash; 16:30</b></div>
            <div>Готем &#183; 4 таж</div>
          </div>
          <div className="clearInfoButton"><img alt="reset choosed settings" src={clearButtonImg} />
          </div>
        </div>

      </div>
    )
  }
}
