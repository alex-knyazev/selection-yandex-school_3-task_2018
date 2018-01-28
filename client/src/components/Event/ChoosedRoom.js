import React, { Component } from 'react'

import clearButtonImg from './../../assets/close-white.svg';

export default class ChoosedRoom extends Component {
  makeTimeText = () => {
    let {
      dateStart,
      dateEnd
    } = this.props;
    const addZeroIfNeed = (time) => time < 10 ? "0" + time : time;
    dateStart = new Date(dateStart);
    dateEnd = new Date(dateEnd);
    const hoursStart = addZeroIfNeed(dateStart.getHours());
    const minutesStart = addZeroIfNeed(dateStart.getMinutes());
    const hoursEnd = addZeroIfNeed(dateEnd.getHours());
    const minutesEnd = addZeroIfNeed(dateEnd.getMinutes());
    return hoursStart + ":" + minutesStart + " - " + hoursEnd + ":" + minutesEnd
  }

  render() {
    let {
      roomTitle,
      floorTitle
    } = this.props;

    let time = this.makeTimeText();
    return (
      <div>
        <span className="inputTitle">Ваша переговорка</span>
        <div className="eventInfo eventInfoChoosedRoom">
          <div>
            <div><b>{time}</b></div>
            <div>{roomTitle} &#183; {floorTitle}</div>
          </div>
          <div className="clearInfoButton" onClick={this.props.clearRoom}>
            <img alt="reset choosed settings" src={clearButtonImg} />
          </div>
        </div>

      </div>
    )
  }
}
