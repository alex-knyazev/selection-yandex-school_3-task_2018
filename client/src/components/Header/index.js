import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './header.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowCreateButton: true,
      scrollTopPixels: 0
    }
  }

  componentWillMount() {
    const pathname = this.props.location.pathname;
    if (pathname === "/editEvent") {
      this.setState({
        isShowCreateButton: false
      })
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    var scrollTop = window.pageYOffset;
    this.setState({
      scrollTopPixels: scrollTop
    })
  }

  render() {
    return (
      <div className="header" >
        <div className="fixedHeader">
          <div className="contentHeader">
            <img alt="logo of application" src={logo} />
            {this.state.isShowCreateButton
              ?
              <button className="buttonCreateEvent">
                <span>
                  Создать встречу
              </span>
              </button>
              :
              null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

