import React, { Component } from 'react'
import { connect } from 'react-redux'
import shallowEqualArrays from 'shallow-equal/arrays';

import clearButtonImg from './../../assets/close.svg';

import getRecommendations from '../../actions/server-actions/recommendations/get';

class RecommendationsRooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendations: []
    }
  }

  componentWillMount = () => {
    const {
      dateStart,
      dateEnd
    } = this.props;

  }

  componentWillReceiveProps = (nextProps) => {
    const {
      dateStart,
      dateEnd,
      usersIds,
      recommendations
    } = nextProps;
    if (dateStart && dateEnd && (dateStart !== this.props.dateStart || dateEnd !== this.props.dateEnd)) {
      this.props.getRecommendations({ dateStart, dateEnd, usersIds });
    }
    if (dateStart && dateEnd && nextProps.recommendations.length) {
      if (!shallowEqualArrays(this.state.recommendations, nextProps.recommendations).length) {
        this.setState({
          recommendations: nextProps.recommendations
        })
      }
    }
  }

  makeRecommendationsElements = () => {
    const { recommendations } = this.state;
    const { dateStart, dateEnd } = this.props;
    let recommendationsElements = recommendations.map((recommendation, i) => {
      return (<Recommendation
        dateStart={dateStart}
        dateEnd={dateEnd}
        roomId={recommendation.id}
        roomTitle={recommendation.title}
        floorTitle={recommendation.floor + " этаж"}
        chooseRoom={this.props.chooseRoom}
      />
      )
    })
    return recommendationsElements;
  }

  render() {
    let {
      dateStart,
      dateEnd
    } = this.props;
    if (!this.state.recommendations.length) {
      return <RecommendationMessage />
    }
    const recommendationsElements = this.makeRecommendationsElements();
    return (
      <div>
        <span className="inputTitle">Рекомендованные переговорки</span>
        {recommendationsElements}
      </div>
    )
  }
}

class Recommendation extends Component {
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

  handleRecommendationCLick = () => {
    this.props.chooseRoom(this.props);
  }

  render() {
    let {
      roomTitle,
      floorTitle
    } = this.props;
    let time = this.makeTimeText();
    return (
      <div className="eventInfo eventInfoRecommendation" onClick={this.handleRecommendationCLick}>
        <div>
          <div><b>{time}</b></div>
          <div>{roomTitle} &#183; {floorTitle}</div>
        </div>
        <div className="clearInfoButton"><img alt="reset choosed settings" src={clearButtonImg} />
        </div>
      </div>
    )
  }
}

class RecommendationMessage extends Component {
  render() {
    return (
      <div>
        <span className="inputTitle">Рекомендованные переговорки</span>
        <div className="infoMessage">
          <p> Для просмотра рекоммендаций уточните планируемое время встречи </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recommendations: state.recommendations
})


const mapDispatchToProps = {
  getRecommendations
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsRooms)
