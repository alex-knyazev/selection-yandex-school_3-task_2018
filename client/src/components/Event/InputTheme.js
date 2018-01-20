import React, { Component } from 'react'

import closeButton from './../../assets/close.svg'

export default class InputTheme extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: ''
    }
  }


  onChangeInputHandler = (e) => {
    this.setState({
      theme: e.target.value
    })
  }

  clickClearInputHandle = () => {
    this.setState({
      theme: ''
    })
  }

  render() {
    return (
      <div>
        <span className="inputName">Тема</span>
        <input
          id="inputTheme"
          type="text"
          value={this.state.theme}
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
