export const DELETE_EVENT = "DELETE_EVENT";

const query = `mutation removeEvent ($id: ID!){
  removeEvent(id: $id) {
    id
  }
}`

export default function createEvent(eventData) {
  const id = eventData.id;
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: JSON.stringify({
        query,
        variables: { id }
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then((response) => {
        const payload = response.data.removeEvent;
        dispatch({
          type: DELETE_EVENT,
          payload
        })
      });
  }
}