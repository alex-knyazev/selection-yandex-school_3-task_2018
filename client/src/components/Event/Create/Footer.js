import React, { Component } from 'react'
import Modal from 'react-modal';

import congratulationsImg from '../../../assets/congrtulations.png';

export default class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEventSaved: false
    }
  }

  handleSaveButtonClick = () => {
    this.setState({
      isEventSaved: true
    })
  }

  handleOkButtonClick = () => {
    this.setState({
      isEventSaved: false
    })
  }

  render() {
    return (
      <div>
        <button className="cancelButton"><b>Отмена</b></button>
        <button className="saveButton" onClick={this.handleSaveButtonClick}><b>Создать встречу</b></button>
        <EventCreatedModal isOpen={this.state.isEventSaved} />
      </div>
    )
  }
}

const EventCreatedModal = ({isOpen}) => {
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
      <p>14 декабря, 15:00 - 17:00</p>
      <p>Готем &#183; 4 этаж</p>
      <button className="okButton" onClick={this.handleOkButtonClick}><b>Хорошо</b></button>
    </Modal>
  )
}
