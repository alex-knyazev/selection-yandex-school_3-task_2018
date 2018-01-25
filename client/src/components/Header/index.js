import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowCreateButton: true,
    }
  }

  componentWillMount() {
    const pathname = this.props.location.pathname;
    const isShowCreateButton = this.checkIfShowCreateButton(pathname);
    this.setState({
      isShowCreateButton: isShowCreateButton
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const pathname = nextProps.location.pathname;
    const isShowCreateButton = this.checkIfShowCreateButton(pathname);
    this.setState({
      isShowCreateButton: isShowCreateButton
    })
  }

  checkIfShowCreateButton = (pathname) => {
    if (pathname === "/editEvent" || pathname === "/createEvent") {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    return (
      <div className="header" >
        <div className="fixedHeader">
          <div className="contentHeader">
            <Link to="/">
              <img alt="logo of application" src={logo} />
            </Link>

            {this.state.isShowCreateButton
              ?
              <Link to="/createEvent">
                <button className="buttonCreateEvent">
                  <span>
                    Создать встречу
                  </span>
                </button>
              </Link>
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

