import { combineReducers } from 'redux'

//ui-actions reducers
import scheduleHeight from './ui/scheduleHeight'
import startAndEndHours from './ui/startAndEndHours'
import selectedDate from './ui/selectedDate'

//server-actions reducers
import eventsOnFloors from './server-data/eventsOnFloors'
import users from './server-data/users'
import eventMutation from './server-data/eventMutation'
import recommendations from './server-data/recommendationRooms'

export default combineReducers({
  scheduleHeight,
  startAndEndHours,
  selectedDate,
  eventsOnFloors,
  users,
  eventMutation,
  recommendations
});