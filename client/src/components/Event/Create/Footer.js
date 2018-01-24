import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';


import congratulationsImg from '../../../assets/congrtulations.png';

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
        <EventCreatedModal isOpen={this.props.isEventCreated} handleOkButtonClick={this.handleOkButtonClick} />
      </div>
    )
  }
}

const EventCreatedModal = ({ isOpen, handleOkButtonClick }) => {
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
      <button className="okButton" onClick={handleOkButtonClick}><b>Хорошо</b></button>
    </Modal>
  )
}
