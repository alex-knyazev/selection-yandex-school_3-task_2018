import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import arrowRight from '../../../assets/arrow.svg';
import arrowLeft from '../../../assets/arrow2.svg';

import {
  MONTHS_SHORT,
  MONTHS,
  WEEKDAYS_SHORT,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK
} from '../../../localizations/calendarLocalizatons'

class DateColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date(),
      initialDate: new Date(),
      isShowCalendar: false,
      scrollTopPixels: 0,
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    var scrollTop = window.pageYOffset
    this.setState({
      scrollTop: scrollTop
    })
  }

  getChoosedDateText = () => {
    const date = this.state.selectedDate;
    let day = date.getDate();
    const month = date.getMonth();
    let additionalPart = '';
    if (new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
      additionalPart = 'Сегодня';
    }

    if (day.toString().length === 1) {
      day = "0" + day
    }
    return {
      dateText: day + ' ' + MONTHS_SHORT[month],
      additionalPart: additionalPart
    }
  }

  checkIfShowNavigate = () => {
    const { initialDate, selectedDate } = this.state;
    let showPrev = true;
    let showNext = true;
    if (selectedDate.getMonth() === initialDate.getMonth() && selectedDate.getDate() === 1) {
      showPrev = false;
    }
    if (selectedDate.getMonth() === (initialDate.getMonth() + 2) && new Date(selectedDate.getTime() + 86400000).getDate() === 1) {
      showNext = false;
    }
    return {
      showPrev,
      showNext
    }
  }

  handlePreviousDayClick = () => {
    let date = this.state.selectedDate;
    date = new Date(date.setDate(date.getDate() - 1));
    this.setState({
      selectedDate: date
    })
  }

  handleNextDayClick = () => {
    let date = this.state.selectedDate;
    date = new Date(date.setDate(date.getDate() + 1));
    this.setState({
      selectedDate: date
    })
  }

  handleChoosedDateClick = () => {
    this.setState({
      isShowCalendar: !this.state.isShowCalendar
    })
  }

  handleDayClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  }

  findElemTopPixels = () => {
    const headerHeight = 71; //mobile header height
    const scrollTop = this.state.scrollTop || 0;
    if (scrollTop > headerHeight) {
      return 0
    }
    else {
      return headerHeight - scrollTop;
    }
  }

  render() {
    const { dateText, additionalPart } = this.getChoosedDateText();

    const showNagivageButtons = this.checkIfShowNavigate();
    const {
      showPrev: showPreviousDateButton,
      showNext: showNextDateButton
    } = showNagivageButtons;
    const topDateColumnPixels = this.findElemTopPixels();
    return (
      <div className="dateColumn" style={{ top: topDateColumnPixels + 'px' }} >
        {showPreviousDateButton
          ?
          <div className="buttonPreviousDate" onClick={this.handlePreviousDayClick}>
            <img alt="arrow previous date" src={arrowLeft} />
          </div>
          :
          null
        }

        <div className="choosedDate" onClick={this.handleChoosedDateClick}>
          {dateText} {additionalPart ? <span>&#183; {additionalPart}</span> : <null />}
          {this.state.isShowCalendar
            ?
            <div className="threeMonthsCalendar">
              <Calendar
                selectedDate={this.state.selectedDate}
                handleDayClick={this.handleDayClick}
              />

            </div>
            :
            null
          }
        </div>
        {showNextDateButton
          ?
          <div className="buttonNextDate" onClick={this.handleNextDayClick}>
            <img alt="arrow next date" src={arrowRight} />
          </div>
          :
          null
        }

      </div>
    )
  }
}


class Calendar extends Component {
  render() {
    const locale = 'ru';
    const numberOfMonths = 3;
    return (
      <DayPicker
        className="dayPicker"
        canChangeMonth={false}
        month={new Date()}
        numberOfMonths={numberOfMonths}
        selectedDays={this.props.selectedDate}
        onDayClick={this.props.handleDayClick}
        locale={locale}
        months={MONTHS[locale]}
        weekdaysLong={WEEKDAYS_LONG[locale]}
        weekdaysShort={WEEKDAYS_SHORT[locale]}
        firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
      />
    )
  }
}


export default DateColumn;