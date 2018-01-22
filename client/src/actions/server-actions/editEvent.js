export const EDIT_EVENT = "EDIT_EVENT";

const query = `mutation editEvent($input: EventCreateInput!, $roomId: ID!, $usersIds: [ID]) {
  editEvent (
    input: $input
    roomId: $roomId,
    usersIds: $usersIds
  ){
    id
  }
}`


export default function editEvent(eventData) {
  const input = {
    title: eventData.title.toString(),
    dateStart: eventData.dateStart.toISOString(),
    dateEnd: eventData.dateEnd.toISOString()
  }
  const roomId = parseInt(eventData.roomId).toString();
  const usersIds = eventData.usersIds.map(id => parseInt(id));
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: JSON.stringify({
        query,
        variables: {
          input: input, 
          roomId,
          usersIds
        }
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then((response) => {
        const event = response.data.editEvent;
        dispatch({
          type: EDIT_EVENT,
          event: event
        })
      });
  }
}