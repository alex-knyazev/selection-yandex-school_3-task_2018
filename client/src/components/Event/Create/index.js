import React, { Component } from 'react'

import InputTheme from '../InputTheme';
import SelectMembers from '../SelectMembers';
import ChooseDateAndTime from '../ChooseDateAndTime';
import ChoosedRoom from '../ChoosedRoom';
import Footer from './Footer'

export default class EditEvent extends Component {
  render() {
    return (
      <div className="editEvent">
        <div className="editEventGrid">
          <div className="editEventPageTitleBlock">
            <h1>Новая встреча</h1>
          </div>

          <div className="inputEventThemeBlock">
            <InputTheme />
          </div>

          <div className="chooseDateAndTimeBlock">
            <ChooseDateAndTime />
          </div>

          <div className="selectEventMembersBlock">
            <SelectMembers />
          </div>

          <div className="choosedRoomBlock">
            <ChoosedRoom />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}
