
const initialState = {
  startHour: 8,
  endHour: 23 
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        default:
            return state;
    }
}