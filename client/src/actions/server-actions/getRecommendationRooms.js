export const GET_RECOMMENDATION_ROOMS = "GET_RECOMMENDATION_ROOMS";

export default function getEventsInRooms(date) {
  const query = {
    dateStart: new Date(new Date().setHours(12,0,0,0)).toISOString(),
    dateEnd: new Date(new Date().setHours(14,0,0,0)).toISOString(),
    usersIds: [0,1]
  }
  return dispatch => {
    return fetch('/getRecommendations', {
      method: 'post',
      body: JSON.stringify({
        query
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then((response) => {
        dispatch({
          type: GET_RECOMMENDATION_ROOMS,
          recommendationRooms: response.data
        })
      });
  }
}