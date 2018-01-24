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
  let result = await request(options)
  result = {"data":{"users":[{"id":"1","homeFloor":0},{"id":"2","homeFloor":3},{"id":"3","homeFloor":2}],"rooms":[{"id":"1","title":"404","capacity":5,"floor":4},{"id":"2","title":"Деньги","capacity":4,"floor":2},{"id":"3","title":"Карты","capacity":4,"floor":2},{"id":"4","title":"Ствола","capacity":2,"floor":2},{"id":"5","title":"14","capacity":6,"floor":3}],"events":[{"id":"1","title":"ШРИ 2018 - начало","dateStart":"2018-01-22T14:23:32.130Z","dateEnd":"2018-01-22T15:23:32.130Z","room":{"id":"1"},"users":[{"id":"1"},{"id":"2"}]},{"id":"2","title":" Хакатон","dateStart":"2018-01-10T15:23:00.000Z","dateEnd":"2018-01-10T16:23:00.000Z","room":{"id":"2"},"users":[{"id":"2"},{"id":"3"}]},{"id":"3","title":"🍨 Пробуем kefir.js","dateStart":"2018-01-22T16:23:00.000Z","dateEnd":"2018-01-22T17:23:00.000Z","room":{"id":"3"},"users":[{"id":"1"},{"id":"2"}]}]}}
  const allUsers = [];
  const allEvents = [];
  const allRooms = [];
  return new Promise((res, rej) => {
    res(result.data);
  })


}

module.exports = getDatabaseData;