export const GET_RECOMMENDATION_ROOMS = "GET_RECOMMENDATION_ROOMS";

export default function getEventsInRooms(date) {
  const query = date;
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
        const payload = response.data.suitedRooms;
        dispatch({
          type: GET_RECOMMENDATION_ROOMS,
          payload
        })
      });
  }
}