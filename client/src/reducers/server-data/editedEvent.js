import { EDIT_EVENT } from '../../actions/server-actions/editEvent';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case EDIT_EVENT:
            return action.event;
        default:
            return state;
    }
}