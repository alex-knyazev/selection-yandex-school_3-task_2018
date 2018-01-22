import React, { Component } from 'react'
import SearchInput, { createFilter } from 'react-search-input'

import deleteButtonImg from './../../assets/close.svg';

const KEYS_TO_FILTER_USERS = ['login', 'homeFloor'];

export default class SelectMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isShowSuggestions: false,
      choosedMembers: this.props.choosedUsers || []
    }
    debugger;
    this.searchUpdated = this.searchUpdated.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if(nextState.choosedMembers != this.state.choosedMembers) {
      const userIds = nextState.choosedMembers.map(member => member.id);
      this.props.changeUsersIds(userIds)
    }
  }
  
  
  addUser = (user) => {
    const currentMembers = this.state.choosedMembers;
    let newMembers = currentMembers.map((el,inde ) => el);
    newMembers.push(user);
    this.setState({
      choosedMembers: newMembers,
      isShowSuggestions: false
    })
  }

  deleteUser = (user) => {
    const newMembers = this.state.choosedMembers.filter( el => el.id !== user.id);
    this.setState({
      choosedMembers: newMembers,
    })
  }

  handleInputFocus = () => {
    this.setState({
      isShowSuggestions: true
    })
  }

  searchUpdated = (term) => {
    this.setState({ searchTerm: term })
  }

  render() {
    const {
      isShowSuggestions,
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
          <Suggestions 
            isShow={isShowSuggestions} 
            searchTerm={searchTerm} 
            allUsers={this.props.allUsers}
            choosedMembers={choosedMembers}
            addUser={this.addUser}
          />
        </div>
        <ChoosedMembers 
          choosedMembers={choosedMembers} 
          deleteUser={this.deleteUser}
        />
      </div>
    )
  }
}


class Suggestions extends Component {
  render() {
    const { searchTerm, isShow, allUsers, choosedMembers } = this.props;
    if (!isShow) {
      return null;
    }
    let notChoosedUsers = allUsers.filter( (user) => {
      return !choosedMembers.find((member) => user.id == member.id)
    })
    const filteredUsers = notChoosedUsers.filter(createFilter(searchTerm, KEYS_TO_FILTER_USERS))
    const suggestionElements = filteredUsers.map(user => 
      <Suggestion addUser={this.props.addUser} key={user.id} user={user} />
    )
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
    this.props.addUser(this.props.user)
  }

  render() {
    const { user } = this.props;
    return (
      <div key={user.id} onClick={this.handleUserClick}>
        <img alt="av" src={user.avatarUrl} />
        <span>{user.login}</span>
        <span className="homeFloor">{user.homeFloor} этаж</span>
      </div>
    )
  }
}


class ChoosedMembers extends Component {
  render() {
    const { choosedMembers, deleteUser} = this.props;
    const choosedMembersElements = choosedMembers.map( user => 
      <ChoosedMember key={user.id} user={user} deleteUser={deleteUser}/>
    )
    return (
      <div className="choosedMembers">
        {choosedMembersElements}
      </div>
    )
  }
}

class ChoosedMember extends Component {

  handleDeleteUserClick = () => {
    this.props.deleteUser(this.props.user)
  }

  render() {
    const { user } = this.props;
    return (
      <div key={user.id} >
        <img className="userAvatar" alt="av" src={user.avatarUrl} />
        <span>{user.login}</span>
        <span className="deleteAvatarButton" onClick={this.handleDeleteUserClick}>
          <img alt="delete member" src={deleteButtonImg} />
        </span>
      </div>
    )
  }
}

