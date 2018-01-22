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
      debugger;
      const defaultInfo = {
        dateStart: this.props.location.state.dateStart,
        dateEnd: this.props.location.state.dateEnd,
        roomId: this.props.location.state.room.id,
        title: this.props.location.state.title,
        usersIds: this.props.location.state.users.map((el)=> el.id),
      }
      this.setState({
        eventDefaultInfo: defaultInfo,
        newEventInfo: defaultInfo,
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

  changeTitle = (title) => {
    const currentInfo = this.state.newEventInfo;
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { title })
    })
  }

  changeUsersIds = (usersIds) => {
    const currentInfo = this.state.newEventInfo;
    if(usersIds.length) { 
      this.setState({
        newEventInfo : Object.assign(this.state.newEventInfo, { usersIds } ) 
      })
    }
  }
  

  render() {
    if (this.state.isRedirectToMain) {
      return <Redirect to=" /" />
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
    const { choosedUsers } = this.props.location.state.users;
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
            <ChooseDateAndTime />
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
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.users,
  editedEvent: state.editedEvent
})

const mapDispatchToProps = {
  getUsers,
  editEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
