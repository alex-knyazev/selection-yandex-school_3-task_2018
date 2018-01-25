import { GET_RECOMMENDATION_ROOMS } from '../../actions/server-actions/recommendations/get';

const initialState = [];

export default (state = [], action = {}) => {
    switch(action.type) {
        case GET_RECOMMENDATION_ROOMS:
            return action.payload;
        default:
            return state;
    }
}