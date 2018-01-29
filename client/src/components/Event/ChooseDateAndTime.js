import React, { Component } from 'react'
import DayPicker from 'react-day-picker';

import makeTimeText from '../../utils/makeTimeText'

import 'react-day-picker/lib/style.css';

import {
  MONTHS,
  WEEKDAYS_SHORT,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK
} from './../../localizations/calendarLocalizatons'

export default class ChooseDateAndTime extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dateStart: null,
      dateEnd: null,
      isShowCalendar: false,
      startTimeText: null,
      endTimeText: null,
      dayText: null
    }
  }

  componentWillMount = () => {
    if (this.props.dateStart && this.props.dateEnd) {
      this.setState({
        dayDate: this.props.dateStart,
        dateStart: this.props.dateStart,
        dateEnd: this.props.dateEnd,
        startTimeText: makeTimeText([this.props.dateStart]),
        endTimeText: makeTimeText([this.props.dateEnd]),
        dayText: this.makeDayText(this.props.dateStart),
      })
    }
    else if (this.props.selectedDate) {
      this.setState({
        dayDate: this.props.selectedDate,
        dayText: this.makeDayText(this.props.selectedDate),
      })
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.dateStart !== this.props.dateStart || nextState.dateEnd !== this.props.dateEnd) {
      this.props.changeDates(nextState.dateStart, nextState.dateEnd)
    }
  }

  handleDayClick = (date) => {
    if (this.state.dateStart && this.state.dateEnd) {
      const dateStart = new Date(date.setHours(this.state.dateStart.getHours(), this.state.dateStart.getMinutes()));
      const dateEnd = new Date(date.setHours(this.state.dateEnd.getHours(), this.state.dateEnd.getMinutes()));
      this.setState({
        isShowCalendar: false,
        dateStart,
        dateEnd,
        dayText: this.makeDayText(dateStart),
        dayDate: date
      });
    }
    else {
      this.setState({
        isShowCalendar: false,
        dayText: this.makeDayText(date),
        dayDate: date
      });
    }

  }

  handleChooseDateCalendarClick = () => {
    this.setState({
      isShowCalendar: !this.state.isShowCalendar
    })
  }

  handleStartTimeChange = (e) => {
    const dateStart = this.state.dateStart;
    const timeText = e.target.value;
    const date = dateStart || this.props.selectedDate;
    const dateFromText = this.dateFromText(date, timeText)
    if (dateFromText) {
      this.setState({
        startTimeText: timeText,
        dateStart: dateFromText
      })
    }
    else {
      this.setState({
        startTimeText: timeText
      })
    }
  }

  handleEndTimeChange = (e) => {
    const dateEnd = this.state.dateEnd;
    const timeText = e.target.value;
    const date = dateEnd || this.props.selectedDate;
    const dateFromText = this.dateFromText(date, timeText);
    if (dateFromText) {
      this.setState({
        endTimeText: timeText,
        dateEnd: dateFromText
      })
    }
    else {
      this.setState({
        endTimeText: timeText
      })
    }
  }

  dateFromText = (date, timeText) => {
    const timeArray = timeText.split(/[\.:-]/);
    if (timeArray.length == 2 && timeArray[0].length == 2 && timeArray[1].length == 2) {
      if (/^\d+$/.test(timeArray[0]) && /^\d+$/.test(timeArray[0])) {
        const integerHour = parseInt(timeArray[0]);
        const integerMinutes = parseInt(timeArray[1]);
        if (integerHour >= 0 && integerHour <= 23 && integerMinutes >= 0 && integerMinutes <= 59) {
          return new Date(date.setHours(timeArray[0], timeArray[1]))
        }
      }
    }
    return undefined;
  }

  makeDayText = (date) => {
    var dd = this.addZeroIfNeed(date.getDate());
    var mm = this.addZeroIfNeed(date.getMonth() + 1);
    var yyyy = date.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }

  addZeroIfNeed = (datePart) => {
    return datePart < 10 ? "0" + datePart : datePart;
  }

  render() {
    const locale = "ru";

    const {
      isShowCalendar,
      startTimeText,
      endTimeText,
      dayText,
      dayDate
    } = this.state;
    return (
      <div>
        <div className="chooseDate">
          <span className="inputTitle">Дата</span>
          <input type="text" value={dayText} onClick={this.handleChooseDateCalendarClick} />
          <div className="chooseDateCalendar" >
            {isShowCalendar
              ?
              <DayPicker
                selectedDays={dayDate}
                onDayClick={this.handleDayClick}
                month={dayDate}
                fromMonth={dayDate}
                toMonth={new Date(dayDate.getFullYear(), dayDate.getMonth() + 2)}
                locale={locale}
                months={MONTHS[locale]}
                weekdaysLong={WEEKDAYS_LONG[locale]}
                weekdaysShort={WEEKDAYS_SHORT[locale]}
                firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
              />
              : null
            }

          </div>
        </div>
        <div className="chooseTime">
          <div className="startTime">
            <span className="inputTitle">Начало</span>
            <input type="text" value={startTimeText} onChange={this.handleStartTimeChange} />
          </div>
          <div className="separator">
            <span> &ndash; </span>
          </div>
          <div className="endTime">
            <span className="inputTitle">Конец</span>
            <input type="text" value={endTimeText} onChange={this.handleEndTimeChange} />
          </div>
        </div>
      </div>
    )
  }
}
