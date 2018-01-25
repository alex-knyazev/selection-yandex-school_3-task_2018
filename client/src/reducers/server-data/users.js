import { GET_USERS } from '../../actions/server-actions/users/get';


const initialState = [];

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
}