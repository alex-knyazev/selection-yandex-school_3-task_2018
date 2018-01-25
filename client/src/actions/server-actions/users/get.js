export const GET_USERS = "GET_USERS";

const query = `{ 
	users {
    id
    login
    homeFloor
    avatarUrl
  }
}`;

export default function getUsers(date) {
  return dispatch => {
    return fetch('/graphql', {
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
        const users = response.data.users;
        dispatch({
          type: GET_USERS,
          users: users
        })
      });
  }
}
