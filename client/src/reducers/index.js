// Imports
import { combineReducers } from 'redux';

import scheduleHeight from './ui/scheduleHeight';
import startAndEndHours from './ui/startAndEndHours';

import eventsInRoomsOnFloors from './server-data/eventsInRoomsOnFloors'


export default combineReducers({
  scheduleHeight,
  startAndEndHours,
  eventsInRoomsOnFloors
});