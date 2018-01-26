import { SET_SELECTED_DATE } from '../../actions/ui/selectedDate.js';

const initialState = new Date();

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_SELECTED_DATE:
            return action.payload;
        default:
            return state;
    }
}