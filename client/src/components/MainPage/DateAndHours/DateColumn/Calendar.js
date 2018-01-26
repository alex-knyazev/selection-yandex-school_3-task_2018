import React from 'react';
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import {
  MONTHS_SHORT,
  MONTHS,
  WEEKDAYS_SHORT,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK
} from '../../../../localizations/calendarLocalizatons'

const Calendar = (props) => {
  const {
    selectedDate,
    handleDayClick
  } = props;
  const locale = 'ru';
  const numberOfMonths = 3;
  return (
    <DayPicker
      className="dayPicker"
      canChangeMonth={false}
      month={new Date()}
      numberOfMonths={numberOfMonths}
      selectedDays={selectedDate}
      onDayClick={handleDayClick}
      locale={locale}
      months={MONTHS[locale]}
      weekdaysLong={WEEKDAYS_LONG[locale]}
      weekdaysShort={WEEKDAYS_SHORT[locale]}
      firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
    />
  )
}

export default Calendar;