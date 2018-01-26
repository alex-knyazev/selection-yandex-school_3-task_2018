import React, { Component } from 'react'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'

import warningGirlImg from '../../../assets/warning-girl.png'

export default class Footer extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      isShowDeleteWarning: false,
      isRedirectToMain: false
    }
  }

  handleDeleteButtonClick = () => {
    this.setState({
      isShowDeleteWarning: true
    })
  }

  handleCancelButtonClick = () => {
    this.setState({
      isRedirectToMain: true
    })
  }

  handleCancelButtonInWarningClick = () =>{
    this.setState({
      isShowDeleteWarning: false,
    })
  }

  handleConfirmDeleteButtonClick = () =>{ 
    this.props.handleDeleteEvent()
  }

  handleSaveButtonClick = () => {
    this.props.handleEditEvent();
  }
  

  render() {
    if (this.state.isRedirectToMain) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
        </div>
        <button className="cancelButton" onClick={this.handleCancelButtonClick}>
          <b>Отмена</b>
        </button>
        <button className="deleteButton" onClick={this.handleDeleteButtonClick}>
          <b>Удалить встречу</b>
        </button>
        <button className="saveButton" onClick={this.handleSaveButtonClick}>
          <b>Сохранить</b>
        </button>
        <Modal
          isOpen={this.state.isShowDeleteWarning}
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
          <img alt="" src={warningGirlImg} />
          <h1>Всреча будет <br/> удалена безвозвратно</h1>
          <button className="cancelButton" onClick={this.handleCancelButtonInWarningClick}><b>Отмена</b></button>
          <button className="sureDeleteButton" onClick={this.handleConfirmDeleteButtonClick}><b>Удалить</b></button>
        </Modal>
      </div>
    )
  }
}
