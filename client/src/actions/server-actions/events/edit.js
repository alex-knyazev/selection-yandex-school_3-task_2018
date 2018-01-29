export const EDIT_EVENT = "EDIT_EVENT";

const editEventQuery  = `
mutation editEvent($id: ID! $input: EventUpdateInput!, $addedUsersIds: [ID], $removedUsersIds: [ID] ) {
  updateEvent (id: $id, input: $input) { id }
  addUsersToEvent (id: $id, usersIds: $addedUsersIds) { id }
  removeUsersFromEvent (id: $id, usersIds: $removedUsersIds) {id }
}
`

const editEventQueryWithRoom  = `
mutation editEvent($id: ID! $input: EventUpdateInput!, $addedUsersIds: [ID], $removedUsersIds: [ID], $roomId: ID! ) {
  updateEvent (id: $id, input: $input) { id }
  addUsersToEvent (id: $id, usersIds: $addedUsersIds) { id }
  removeUsersFromEvent (id: $id, usersIds: $removedUsersIds) {id }
  changeEventRoom(id: $id, roomId: $roomId) { id }
}
`

const makeEditEventQuery = (eventData) => {
  const id = eventData.id;
  const input = eventData.event;
  const addedUsersIds = eventData.addedUsers || [];
  const removedUsersIds = eventData.removedUsers || [];
  const roomId = eventData.roomId || null;
  debugger;
  let query = editEventQueryWithRoom;
  if(!roomId) {
    query = editEventQuery
  }
  if(eventData.event) {
    return {
      query,
      variables: {
        id,
        input,
        addedUsersIds,
        removedUsersIds,
        roomId
      }
    }
  }
}

export default function editEvent(eventData) {
  const {query, variables} = makeEditEventQuery(eventData);
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: JSON.stringify({
        query, variables
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then((response) => {
        const payload = response.data.updateEvent;
        dispatch({
          type: EDIT_EVENT,
          payload
        })
      });
  }
}