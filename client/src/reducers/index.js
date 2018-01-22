import { combineReducers } from 'redux';

import scheduleHeight from './ui/scheduleHeight';
import startAndEndHours from './ui/startAndEndHours';
import selectedDate from './ui/selectedDate';

import eventsInRoomsOnFloors from './server-data/eventsInRoomsOnFloors';
import users from './server-data/users';

export default combineReducers({
  scheduleHeight,
  startAndEndHours,
  selectedDate,
  eventsInRoomsOnFloors,
  users
});