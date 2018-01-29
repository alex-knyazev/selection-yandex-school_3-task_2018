import { GET_EVENTS_BY_FLOORS } from '../../actions/server-actions/events/getByFloors';

const initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_EVENTS_BY_FLOORS:
            if (action.payload) {
                return action.payload;
            }
        default:
            return state;
    }
}