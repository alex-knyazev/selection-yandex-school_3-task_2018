import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import getUsers from '../../../actions/server-actions/users/get'
import editEvent from '../../../actions/server-actions/events/edit'
import deleteEvent from '../../../actions/server-actions/events/delete'

import InputTitle from '../InputTitle'
import SelectMembers from '../SelectMembers'
import ChooseDateAndTime from '../ChooseDateAndTime'
import ChoosedRoom from '../ChoosedRoom'
import RecommendationsRooms from '../RecommendationsRooms'
import Footer from './Footer'

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirectToMain: false,
      isRoomSelected: false
    }
  }

  componentWillMount = () => {
    this.props.getUsers();
    if (this.props.location.state) {
      const defaultInfo = {
        id: this.props.location.state.id,
        dateStart: new Date(this.props.location.state.dateStart),
        dateEnd: new Date(this.props.location.state.dateEnd),
        roomId: this.props.location.state.room.id,
        title: this.props.location.state.title,
        usersIds: this.props.location.state.users.map((el) => el.id),
      }
      this.setState({
        eventDefaultInfo: { ...defaultInfo },
        newEventInfo: { ...defaultInfo },
        roomTitle: this.props.location.state.room.title,
        floorTitle: this.props.location.state.floorTitle,
        isRoomSelected: true
      })
    }
    else {
      this.setState({
        isRedirectToMain: true
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.eventMutation !== this.props.eventMutation) {
      this.setState({
        isRedirectToMain: true
      })
    }
  }

  changeTitle = (title) => {
    const currentInfo = this.state.newEventInfo;
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { title })
    })
  }

  changeDates = (dateStart, dateEnd) => {
    const currentInfo = this.state.newEventInfo;
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { dateStart, dateEnd })
    })
  }

  changeUsersIds = (usersIds) => {
    const currentInfo = this.state.newEventInfo;
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { usersIds })
    })
  }

  findAddedAndRemovedUsers = () => {
    const { usersIds: defaultUsersIds } = this.state.eventDefaultInfo;
    const { usersIds: newUsersIds } = this.state.newEventInfo;
    const removedUsers = defaultUsersIds.filter((defUser) =>
      !newUsersIds.find((curUser) => defUser === curUser)
    )
    const addedUsers = newUsersIds.filter((curUser) =>
      !defaultUsersIds.find((defUser) => defUser === curUser)
    )
    return {
      removedUsers: removedUsers.length ? removedUsers : undefined,
      addedUsers: addedUsers.length ? addedUsers : undefined
    }
  }

  findChangedField = (key) => {
    const defaultField = this.state.eventDefaultInfo[key];
    const newField = this.state.newEventInfo[key];
    if (defaultField !== newField) {
      return newField;
    }
    else {
      return undefined;
    }
  }

  findChangedFields = () => {
    const changedFields = { event: {} };
    const { addedUsers, removedUsers } = this.findAddedAndRemovedUsers();
    if (addedUsers) {
      changedFields.addedUsers = addedUsers
    }
    if (removedUsers) {
      changedFields.removedUsers = removedUsers
    }
    const changedTitle = this.findChangedField('title');
    if (changedTitle) {
      changedFields.event.title = changedTitle
    }
    const changedDateStart = this.findChangedField('dateStart');
    if (changedDateStart) {
      changedFields.event.dateStart = changedDateStart
    }
    const changedDateEnd = this.findChangedField('dateEnd');
    if (changedDateEnd) {
      changedFields.event.dateEnd = changedDateEnd
    }
    const changedRoomId = this.findChangedField('roomId');
    if (changedRoomId) {
      changedFields.roomId = changedRoomId
    }
    return changedFields;
  }

  chooseRoom = (roomInfo) => {
    const info = {
      id: this.state.newEventInfo.id,
      dateStart: roomInfo.dateStart,
      dateEnd: roomInfo.dateEnd,
      roomId: roomInfo.roomId,
      title: this.state.newEventInfo.title,
      usersIds: this.state.newEventInfo.usersIds,
    }
    this.setState({
      newEventInfo: info,
      roomTitle: roomInfo.roomTitle,
      floorTitle: roomInfo.floorTitle,
      isRoomSelected: true
    })
  }

  clearRoom = () => {
    const info = {
      id: this.state.newEventInfo.id,
      dateStart: this.state.newEventInfo.dateStart,
      dateEnd: this.state.newEventInfo.dateEnd,
      title: this.state.newEventInfo.title,
      usersIds: this.state.newEventInfo.usersIds,
    }
    this.setState({
      newEventInfo: info,
      roomTitle: '',
      floorTitle: '',
      isRoomSelected: false
    })
  }

  handleEditEvent = () => {
    const changedFields = this.findChangedFields();
    if (Object.keys(changedFields).length > 1 || Object.keys(changedFields.event).length) {
      debugger;
      this.props.editEvent(Object.assign(changedFields, { id: this.state.newEventInfo.id }));
    }
    else {
      this.setState({
        isRedirectToMain: true
      })
    }
  }

  handleDeleteEvent = () => {
    this.props.deleteEvent({ id: this.state.newEventInfo.id });
  }

  render() {
    if (this.state.isRedirectToMain) {
      return <Redirect to="/" />
    }
    const {
      roomTitle,
      floorTitle,
      newEventInfo,
      isRoomSelected
    } = this.state;
    const {
      dateStart,
      dateEnd,
      title,
      usersIds
    } = newEventInfo;
    const { allUsers } = this.props;
    const choosedUsers = this.props.location.state.users;
    return (
      <div className="editEvent">
        <div className="editEventGrid">
          <div className="editEventPageTitleBlock">
            <h1>Редактирование встречи</h1>
          </div>

          <div className="inputEventThemeBlock">
            <InputTitle
              title={title}
              changeTitle={this.changeTitle}
            />
          </div>

          <div className="chooseDateAndTimeBlock">
            <ChooseDateAndTime
              dateStart={dateStart}
              dateEnd={dateEnd}
              changeDates={this.changeDates}
            />
          </div>

          <div className="selectEventMembersBlock">
            <SelectMembers
              allUsers={allUsers}
              changeUsersIds={this.changeUsersIds}
              choosedUsers={choosedUsers}
            />
          </div>

          <div className="choosedRoomBlock">
            {isRoomSelected
              ?
              <ChoosedRoom
                roomTitle={roomTitle}
                floorTitle={floorTitle}
                dateStart={dateStart}
                dateEnd={dateEnd}
                clearRoom={this.clearRoom}
              />
              :
              <RecommendationsRooms
                dateStart={dateStart}
                dateEnd={dateEnd}
                usersIds={usersIds}
                chooseRoom={this.chooseRoom}
                isRoomSelected={isRoomSelected}
              />
            }
          </div>
        </div>
        <div className="footer">
          <Footer
            handleEditEvent={this.handleEditEvent}
            handleDeleteEvent={this.handleDeleteEvent}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.users,
  eventMutation: state.eventMutation,
})

const mapDispatchToProps = {
  getUsers,
  editEvent,
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
