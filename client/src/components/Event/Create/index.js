import React, { Component } from 'react'
import { connect } from 'react-redux'

import getUsers from '../../../actions/server-actions/users/get'
import createEvent from '../../../actions/server-actions/events/create'

import InputTitle from '../InputTitle'
import SelectMembers from '../SelectMembers'
import ChooseDateAndTime from '../ChooseDateAndTime'
import ChoosedRoom from '../ChoosedRoom'
import RecommendationsRooms from '../RecommendationsRooms'
import Footer from './Footer'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventDefaultInfo: null,
      newEventInfo: null,
      roomTitle: '',
      floorTitle: '',
      isEventCreated: false,
      isRoomSelected: false
    }
    this.changeDates = this.changeDates.bind(this);
  }

  componentWillMount = () => {
    this.props.getUsers();
    if (this.props.location.state) {
      const defaultInfo = {
        dateStart: this.props.location.state.freeTimeStart,
        dateEnd: this.props.location.state.freeTimeEnd,
        roomId: this.props.location.state.roomId,
        title: '',
        usersIds: [],
      }
      this.setState({
        eventDefaultInfo: defaultInfo,
        newEventInfo: defaultInfo,
        roomTitle: this.props.location.state.roomTitle,
        floorTitle: this.props.location.state.floorTitle,
        isRoomSelected: true
      })
    }
    else {
      const defaultInfo = {
        usersIds: []
      }
      this.setState({
        eventDefaultInfo: defaultInfo,
        newEventInfo: defaultInfo
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.eventMutation !== this.props.eventMutation) {
      this.setState({
        isEventCreated: true
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
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { usersIds })
    })

  }

  changeDates = (dateStart, dateEnd) => {
    const currentInfo = this.state.newEventInfo;
    this.setState({
      newEventInfo: Object.assign(this.state.newEventInfo, { dateStart, dateEnd })
    })
  }

  handleCreateEvent = () => {
    this.props.createEvent(this.state.newEventInfo);
  }

  chooseRoom = (roomInfo) => {
    const info = {
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

  render() {
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
      roomId,
      usersIds
    } = newEventInfo;
    const { allUsers, selectedDate } = this.props;
    return (
      <div className="editEvent">
        <div className="editEventGrid">
          <div className="editEventPageTitleBlock">
            <h1>Новая встреча</h1>
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
              selectedDate={selectedDate}
              changeDates={this.changeDates}
            />
          </div>

          <div className="selectEventMembersBlock">
            <SelectMembers
              changeUsersIds={this.changeUsersIds}
              allUsers={allUsers}
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
            isEventCreated={this.state.isEventCreated}
            handleCreateEvent={this.handleCreateEvent}
            dateStart={dateStart}
            dateEnd={dateEnd}
            roomTitle={roomTitle}
            floorTitle={floorTitle}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.users,
  selectedDate: state.selectedDate,
  eventMutation: state.eventMutation
})

const mapDispatchToProps = {
  getUsers,
  createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
