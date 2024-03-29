import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

export default class FreeTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
      isClicked: false
    }
  }

  onMouseOver = () => {
    this.setState({
      isHovered: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      isHovered: false
    })
  }

  handleFreeTimeClick = () => {
    this.setState({
      isClicked: true
    })
  }

  render() {
    if(this.state.isClicked) {
      return <Redirect to={ {
        pathname: "/createEvent", 
        state: { ...this.props }
      }} />
    }
    const { widthPercents } = this.props;
    let isShowPlus = true;
    if(widthPercents < 3) {
      isShowPlus = false
    }
    return (
      <div
        className="freeTime"
        style={{ flexBasis: widthPercents + "%" }}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        onClick={this.handleFreeTimeClick}
      >
        {this.state.isHovered && isShowPlus
          ? <div className="pluseSign"> &#43; </div>
          : null
        }

      </div>
    )
  }
}
