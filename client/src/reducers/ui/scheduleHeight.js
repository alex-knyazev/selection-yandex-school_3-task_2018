import { SET_SCHEDULE_HEIGHT } from '../../actions/ui/scheduleHeight';

const initialState = 0;

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_SCHEDULE_HEIGHT:
            return action.payload;
        default:
            return state;
    }
}