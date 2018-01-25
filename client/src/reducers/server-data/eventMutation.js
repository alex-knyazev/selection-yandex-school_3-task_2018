import { CREATE_EVENT } from '../../actions/server-actions/events/create';
import { EDIT_EVENT } from '../../actions/server-actions/events/edit';
import { DELETE_EVENT } from '../../actions/server-actions/events/delete';

const initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case CREATE_EVENT:
        case EDIT_EVENT:
        case DELETE_EVENT:
            return action.payload
        default:
            return state;
    }
}