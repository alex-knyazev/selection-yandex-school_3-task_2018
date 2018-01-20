import React, { Component } from 'react'

export default class EmptyTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false
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

  render() {
    const { widthPercents } = this.props;
    let isShowPlus = true;
    if(widthPercents < 3) {
      isShowPlus = false
    }
    return (
      <div
        className="emptyTime"
        style={{ flexBasis: widthPercents + "%" }}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.isHovered && isShowPlus
          ? <div className="pluseSign"> &#43; </div>
          : null
        }

      </div>
    )
  }
}
