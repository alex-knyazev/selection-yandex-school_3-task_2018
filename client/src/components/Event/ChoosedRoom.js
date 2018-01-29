import React, { Component } from 'react'

import makeTimeText from '../../utils/makeTimeText'

import clearButtonImg from './../../assets/close-white.svg'

export default class ChoosedRoom extends Component {

  render() {
    let {
      roomTitle,
      floorTitle
    } = this.props;

    let time = makeTimeText([this.props.dateStart, this.props.dateEnd]);
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
