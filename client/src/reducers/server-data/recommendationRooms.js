import { GET_RECOMMENDATION_ROOMS } from '../../actions/server-actions/getRecommendationRooms';

const initialState = [];

export default (state = [], action = {}) => {
    switch(action.type) {
        case GET_RECOMMENDATION_ROOMS:
            return action.recommendationRooms;
        default:
            return state;
    }
}