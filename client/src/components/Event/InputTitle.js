import React, { Component } from 'react'

import closeButton from './../../assets/close.svg'

export default class InputTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if(nextState.title !== this.state.title) {
      this.props.changeTitle(nextState.title)
    }
  }

  onChangeInputHandler = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  clickClearInputHandle = () => {
    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <div>
        <span className="inputName">Тема</span>
        <input
          id="InputTitle"
          type="text"
          value={this.state.title}
          onChange={this.onChangeInputHandler}
          placeholder="О чем будете говорить?"
        />
        <button
          className="clearInputButton"
          type="reset"
          onClick={this.clickClearInputHandle}
        >
          <img alt="clear" src={closeButton} />
        </button>
      </div>
    )
  }
}
