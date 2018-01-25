import React, { Component } from 'react'
import { connect } from 'react-redux'

import getUsers from '../../../actions/server-actions/users/get'
import createEvent from '../../../actions/server-actions/events/create'

import InputTitle from '../InputTitle'
import SelectMembers from '../SelectMembers'
import ChooseDateAndTime from '../ChooseDateAndTime'
import ChoosedRoom from '../ChoosedRoom'
import RecommendationRooms from '../RecommendationRooms'
import Footer from './Footer'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventDefaultInfo: null,
      newEventInfo: null,
      roomTitle: '',
      floorTitle: '',
      isEventCreated: false
    }
    this.changeDates = this.changeDates.bind(this);
  }

  componentWillMount = () => {
    this.props.getUsers();
    if (this.props.location.state) {
      const defaultInfo = {
        dateStart: this.props.location.state.emptyTimeStart,
        dateEnd: this.props.location.state.emptyTimeEnd,
        roomId: this.props.location.state.roomId,
        title: '',
        usersIds: [],
      }
      this.setState({
        eventDefaultInfo: defaultInfo,
        newEventInfo: defaultInfo,
        roomTitle: this.props.location.state.roomTitle,
        floorTitle: this.props.location.state.floorTitle
      })
    }
    else {
      const defaultInfo = {
        dateStart: this.props.selectedDate,
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

  render() {
    const {
      roomTitle,
      floorTitle,
      newEventInfo
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
            {roomId 
              ?
              <ChoosedRoom
                roomTitle={roomTitle}
                floorTitle={floorTitle}
                dateStart={dateStart}
                dateEnd={dateEnd}
              /> 
              :
              <RecommendationRooms 
                dateStart={dateStart}
                dateEnd={dateEnd}
                usersIds={usersIds}
              /> 
            }
          </div>

        </div>

        <div className="footer">
          <Footer
            isEventCreated={this.state.isEventCreated}
            handleCreateEvent={this.handleCreateEvent}
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
