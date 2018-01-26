import React from 'react'

import Calendar from './Calendar'

import { MONTHS_SHORT } from '../../../../localizations/calendarLocalizatons'
import isToday from '../../../../utils/isToday'

const ChoosedDate = (props) => {
  const {
    selectedDate,
    isShowCalendar,
    handleChoosedDateClick,
    handleDayClick 
  } = props;
  const { 
    dateText, 
    additionalPart 
  } = getChoosedDateText(selectedDate);

  return (
    <div className="choosedDate" onClick={props.handleChoosedDateClick}>
      {dateText} {additionalPart ? <span>&#183; {additionalPart}</span> : <null />}
      {isShowCalendar
        ?
        <div className="threeMonthsCalendar">
          <Calendar
            selectedDate={selectedDate}
            handleDayClick={handleDayClick}
          />
        </div>
        :
        null
      }
    </div>
  )
}

const getChoosedDateText = (selectedDate) => {
  let day = selectedDate.getDate();
  const month = selectedDate.getMonth();
  const isDateToday = isToday(selectedDate);
  let additionalPart = '';
  if (isDateToday) {
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

export default ChoosedDate;
