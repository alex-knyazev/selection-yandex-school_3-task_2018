import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'

import { MONTHS_SHORT } from '../../../localizations/calendarLocalizatons'
import isToday from '../../../utils/isToday'
import makeTimeText from '../../../utils/makeTimeText'

import congratulationsImg from '../../../assets/congrtulations.png'

export default class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOkClicked: false
    }
    this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
  }

  handleSaveButtonClick = () => {
    this.props.handleCreateEvent();
  }

  handleOkButtonClick = () => {
    this.setState({
      isModalOkClicked: true
    })
  }

  render() {
    if (this.state.isModalOkClicked) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <button className="cancelButton" onClick={this.handleCancelButtonClick}>
          <Link to="/">
            <b>Отмена</b>
          </Link>
        </button>

        <button className="saveButton" onClick={this.handleSaveButtonClick}><b>Создать встречу</b></button>
        <EventCreatedModal
          isOpen={this.props.isEventCreated}
          handleOkButtonClick={this.handleOkButtonClick}
          dateStart={this.props.dateStart}
          dateEnd={this.props.dateEnd}
          roomTitle={this.props.roomTitle}
          floorTitle={this.props.floorTitle}
        />
      </div>
    )
  }
}

const EventCreatedModal = (props) => {

  const getChoosedDateText = () => {
    const selectedDate = new Date(props.dateStart);
    if(!selectedDate) {
      return '';
    }
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

  const {
    isOpen,
    handleOkButtonClick,
    dateStart,
    dateEnd,
    roomTitle,
    floorTitle
  } = props;

  const time = makeTimeText([dateStart,dateEnd]);
  const { 
    dateText,
    additionalPart
  } = getChoosedDateText();
  
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Modal"
      className={{
        base: 'eventModal',
        afterOpen: 'eventModalAfterOpen',
        beforeClose: 'eventModalBeforeClose'
      }}
      overlayClassName={{
        base: 'eventModalOverlay',
        afterOpen: 'eventModalOverlayAfterOpen',
        beforeClose: 'eventModalOverlayBeforeClose'
      }}
    >
      <img alt="" src={congratulationsImg} />
      <h1>Всреча создана!</h1>
      <p>{dateText} &#183; {additionalPart},  {time}</p>
      <p>{roomTitle} &#183; {floorTitle}</p>
      <button className="okButton" onClick={handleOkButtonClick}><b>Хорошо</b></button>
    </Modal>
  )
}


