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
  result = {"data":{"users":[{"id":"1","homeFloor":0},{"id":"2","homeFloor":3},{"id":"3","homeFloor":2}],"rooms":[{"id":"1","title":"404","capacity":5,"floor":4},{"id":"2","title":"Деньги","capacity":4,"floor":2},{"id":"3","title":"Карты","capacity":4,"floor":2},{"id":"4","title":"Ствола","capacity":2,"floor":2},{"id":"5","title":"14","capacity":6,"floor":3},{"id":"6","title":"myRoom","capacity":2,"floor":2}],"events":[{"id":"1","title":"ШРИ 2018 - начало","dateStart":"2018-01-25T14:28:37.064Z","dateEnd":"2018-01-25T15:28:37.064Z","room":{"id":"1"},"users":[{"id":"1"},{"id":"2"}]},{"id":"2","title":"👾 Хакатон 👾","dateStart":"2018-01-25T15:28:37.064Z","dateEnd":"2018-01-25T16:28:37.064Z","room":{"id":"2"},"users":[{"id":"2"},{"id":"3"}]},{"id":"3","title":"🍨 Пробуем kefir.js","dateStart":"2018-01-25T06:28:37.064Z","dateEnd":"2018-01-25T07:28:37.064Z","room":{"id":"3"},"users":[{"id":"1"},{"id":"3"}]},{"id":"4","title":"Тестируем продукт1","dateStart":"2018-01-25T07:28:37.064Z","dateEnd":"2018-01-25T08:28:37.064Z","room":{"id":"6"},"users":[]},{"id":"5","title":"Тестируем продукт2","dateStart":"2018-01-25T08:28:37.064Z","dateEnd":"2018-01-25T09:28:37.064Z","room":{"id":"6"},"users":[]},{"id":"6","title":"Тестируем продукт4","dateStart":"2018-01-25T09:28:37.064Z","dateEnd":"2018-01-25T10:28:37.064Z","room":{"id":"6"},"users":[]},{"id":"7","title":"Тестируем продукт5","dateStart":"2018-01-25T11:28:37.064Z","dateEnd":"2018-01-25T12:28:37.064Z","room":{"id":"6"},"users":[]},{"id":"8","title":"Тестируем продукт6","dateStart":"2018-01-25T14:28:37.064Z","dateEnd":"2018-01-25T15:28:37.064Z","room":{"id":"6"},"users":[]},{"id":"9","title":"Тестируем продукт6","dateStart":"2018-01-25T15:28:37.064Z","dateEnd":"2018-01-25T16:28:37.064Z","room":{"id":"6"},"users":[]}]}}
  const allUsers = [];
  const allEvents = [];
  const allRooms = [];
  return new Promise((res, rej) => {
    res(result.data);
  })


}

module.exports = getDatabaseData;