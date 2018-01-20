// Imports
import { combineReducers } from 'redux';

import scheduleHeight from './scheduleHeight';
import startAndEndHours from './startAndEndHours';

export default combineReducers({
  scheduleHeight,
  startAndEndHours
});