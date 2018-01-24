import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import InputTitle from '../InputTitle';
import SelectMembers from '../SelectMembers';
import ChooseDateAndTime from '../ChooseDateAndTime';
import ChoosedRoom from '../ChoosedRoom';
import Footer from './Footer'

import getUsers from '../../../actions/server-actions/getUsers'
import editEvent from '../../../actions/server-actions/editEvent'
import deleteEvent from '../../../actions/server-actions/deleteEvent'

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirectToMain: false
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
        floorTitle: this.props.location.state.floorTitle
      })
    }
    else {
      this.setState({
        isRedirectToMain: true
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.editedEvent !== this.props.editedEvent || 
        nextProps.deletedEvent !== this.props.deletedEvent) {
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
    return changedFields;
  }

  handleEditEvent = () => {
    const changedFields = this.findChangedFields();
    if (Object.keys(changedFields).length > 1 || Object.keys(changedFields.event).length) {
      this.props.editEvent(Object.assign(changedFields, { id: this.state.newEventInfo.id }));
    }
    else {
      this.setState({
        isRedirectToMain: true
      })
    }
  }

  handleDeleteEvent = () => {
    this.props.deleteEvent({id: this.state.newEventInfo.id });
  }

  render() {
    if (this.state.isRedirectToMain) {
      return <Redirect to="/" />
    }
    const {
      roomTitle,
      floorTitle,
      newEventInfo
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
            <ChoosedRoom
              roomTitle={roomTitle}
              floorTitle={floorTitle}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
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
  editedEvent: state.editedEvent,
  deletedEvent: state.deletedEvent
})

const mapDispatchToProps = {
  getUsers,
  editEvent,
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
