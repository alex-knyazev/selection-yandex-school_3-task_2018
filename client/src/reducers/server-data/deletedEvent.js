import { DELETE_EVENT } from '../../actions/server-actions/deleteEvent';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case DELETE_EVENT:
            return action.event;
        default:
            return state;
    }
}