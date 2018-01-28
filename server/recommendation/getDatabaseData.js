var request = require('request-promise');
var port = require('../config').port;

const query = `{
  users {
    id
    homeFloor
  }
  rooms {
    id
    title
    capacity
    floor
  }
  events{
    id
    title
    dateStart
    dateEnd
    room {
      id
    }
    users {
      id
    }
  }
}
`

const getDatabaseData = async (data) => {
  const body = JSON.stringify({
    query: query
  });
  const options = {
    method: 'POST',
    uri: `http://localhost:${port}/graphql`,
    body: body,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const allUsers = [];
  const allEvents = [];
  const allRooms = [];
  return new Promise((res, rej) => {
    res(result.data);
  })


}

module.exports = getDatabaseData;