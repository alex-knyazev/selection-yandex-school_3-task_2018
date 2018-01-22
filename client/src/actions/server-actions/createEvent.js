export const CREATE_EVENT = "CREATE_EVENT";


/*
const query = `mutation createEvent {
  createEvent (
    input:{title: "sss", dateStart:"2017-12-13T06:00:00.981Z", dateEnd: "2017-12-13T06:00:00.981Z"}
    roomId: 2
  ){
    id
  }
}`*/

const query = `mutation createEvent($input: EventCreateInput!, $roomId: ID!, $usersIds: [ID]) {
  createEvent (
    input: $input
    roomId: $roomId,
    usersIds: $usersIds
  ){
    id
  }
}`


export default function createEvent(eventData) {
  const input = {
    title: eventData.title.toString(),
    dateStart: eventData.dateStart.toISOString(),
    dateEnd: eventData.dateEnd.toISOString()
  }
  const roomId = parseInt(eventData.roomId).toString();
  const usersIds = eventData.usersIds.map(id => parseInt(id));
  debugger;
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
        const event = response.data;
        debugger;
        dispatch({
          type: CREATE_EVENT,
          users: event
        })
      });
  }
}