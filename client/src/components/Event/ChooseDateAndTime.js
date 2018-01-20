import React, { Component } from 'react'
import DayPicker from 'react-day-picker';

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
      selectedDate: new Date(),
      isShowCalendar: false
    }
  }

  handleDayClick = (day) => {
    this.setState({
      selectedDate: day,
      isShowCalendar: false
    });
  }


  handleChooseDateCalendarClick = () => {
    this.setState({
      isShowCalendar: !this.state.isShowCalendar
    })
  }

  render() {
    const locale = "ru";
    const { selectedDate, isShowCalendar } = this.state;
    return (
      <div>
        <div className="chooseDate">
          <span className="inputName">Дата</span>
          <input type="text" value="21-01-2015"  onClick={this.handleChooseDateCalendarClick}/>
          <div className="chooseDateCalendar" >
            {isShowCalendar 
              ?
              <DayPicker
                selectedDays={selectedDate}
                onDayClick={this.handleDayClick}
                month={selectedDate}
                fromMonth={selectedDate}
                toMonth={new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2)}
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
            <span className="inputName">Начало</span>
            <input type="text" value="08:01" />
          </div>
          <div className="separator">
            <span> &ndash; </span>
          </div>
          <div className="endTime">
            <span className="inputName">Конец</span>
            <input type="text" value="21:01" />
          </div>
        </div>
      </div>
    )
  }
}
