import React, { Component } from 'react'
import SearchInput, { createFilter } from 'react-search-input'

import testUsersData from './../../testData/testUsersData'

import deleteButtonImg from './../../assets/close.svg';

const KEYS_TO_FILTER_USERS = ['name', 'homeFloor'];

export default class SelectMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      isFocused: false,
      choosedMembers: [testUsersData[0], testUsersData[1]]
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
  
  handleInputFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  handleInputBlur = () => {
    this.setState({
      isFocused: false
    })
  }

  searchUpdated = (term) => {
    this.setState({ searchTerm: term })
  }

  render() {
    const {
      isFocused,
      searchTerm,
      choosedMembers
    } = this.state;
    return (
      <div>
        <div className="selectMembers">
          <span className="inputName">Участники</span>
          <SearchInput
            className="selectMembersInput"
            onChange={this.searchUpdated}
            placeholder="Поиск участников"
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          <Suggestions isShow={isFocused} searchTerm={searchTerm} />
        </div>
        <ChoosedMembers choosedMembers={choosedMembers} />
      </div>
    )
  }
}


class Suggestions extends Component {
  render() {
    const { searchTerm, isShow } = this.props;
    if (!isShow) {
      return null;
    }
    const filteredUsers = testUsersData.filter(createFilter(searchTerm, KEYS_TO_FILTER_USERS))
    const suggestionElements = filteredUsers.map(user => <Suggestion user={user} />)
    if (!suggestionElements.length) {
      return null;
    }
    return (
      <div className="suggestions">
        {suggestionElements}
      </div>
    )
  }
}


class Suggestion extends Component {

  handleUserClick = () => {
    //add user to event function
  }

  render() {
    const { user } = this.props;
    return (
      <div key={user.id} onClick={this.handleUserClick}>
        <img alt="av" src={"https://api.adorable.io/avatars/25/"+ user.id +"abott@adorable.png"} />
        <span>{user.name}</span>
        <span className="homeFloor">{user.homeFloor} этаж</span>
      </div>
    )
  }
}


class ChoosedMembers extends Component {
  render() {
    const { choosedMembers} = this.props;
    const choosedMembersElements = choosedMembers.map(user => <ChoosedMember user={user} />)
    return (
      <div className="choosedMembers">
        {choosedMembersElements}
      </div>
    )
  }
}

class ChoosedMember extends Component {

  handleDeleteUserClick = () => {
    //add user to event function
  }

  render() {
    const { user } = this.props;
    return (
      <div key={user.id} >
        <img className="userAvatar" alt="av" src={"https://api.adorable.io/avatars/25/"+ user.id +"abott@adorable.png"} />
        <span>{user.name}</span>
        <span className="deleteAvatarButton" onClick={this.handleDeleteUserClick}>
          <img alt="delete member" src={deleteButtonImg} />
        </span>
      </div>
    )
  }
}

