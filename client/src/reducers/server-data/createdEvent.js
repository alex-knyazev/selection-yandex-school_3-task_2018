import { CREATE_EVENT } from '../../actions/server-actions/createEvent';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case CREATE_EVENT:
            return action.event;
        default:
            return state;
    }
}