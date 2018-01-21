import { EVENTS_IN_ROOMS_ON_FLOORS } from '../../actions/server-actions/getEventsInRoomsOnFloors';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case EVENTS_IN_ROOMS_ON_FLOORS:
            return action.eventsInRoomsOnFloors;
        default:
            return state;
    }
}