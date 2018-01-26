import React, { Component } from 'react'
import { connect } from 'react-redux'

import clearButtonImg from './../../assets/close.svg';

import getRecommendations from '../../actions/server-actions/recommendations/get';

class ChoosedRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommedtations: []
    }
  }

  componentWillMount = () => {
    const {
      dateStart,
      dateEnd
    } = this.props;
    this.props.getRecommendations()
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      dateStart,
      dateEnd, 
      usersIds
    } = nextProps;
    if (dateStart && dateEnd) {
      this.props.getRecommendations({dateStart, dateEnd, usersIds});
    }
  }


  /*
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
  */

  render() {
    let {
      dateStart,
      dateEnd
    } = this.props;
    if (!this.state.recommedtations.length) {
      return <RecommendationMessage />
    }
    //let time = this.makeTimeText();
    return (
      <div>
        <span className="inputName">Рекомендованные переговорки</span>
        {/*<div className="eventInfo">
          <div>
            <div><b>{time}</b></div>
            <div>{roomTitle} &#183; {floorTitle}</div>
          </div>
          <div className="clearInfoButton"><img alt="reset choosed settings" src={clearButtonImg} />
          </div>
        </div>*/}

      </div>
    )
  }
}

class RecommendationMessage extends Component {
  render() {
    return (
      <div>
        <span className="yourRoom">Рекомендованные переговорки</span>
        <div className="infoMessage">
          <p> Для просмотра рекоммендаций уточните планируемое время встречи </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recommedtations: state.recommedtations
})


const mapDispatchToProps = {
  getRecommendations
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosedRoom)
