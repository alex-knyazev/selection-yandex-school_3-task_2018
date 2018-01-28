const { models, sequelize } = require('./models');

function createData () {
  let usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2
    }
  ]);

  let roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 2
    },
    {
      title: '14',
      capacity: 6,
      floor: 3
    },
    {
      title: 'myRoom',
      capacity: 2,
      floor: 2
    }
  ]);

  const HOUR = 60 * 60 * 1000;
  let now = new Date();
  let oneHourLater = new Date(now.getTime() + HOUR);
  let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);
  let hour = [];
  for (let i = 0; i < 12; i++) {
    const time = new Date(new Date().setHours((now.getHours() + i) -7));

    hour[i] = time
  }
  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: now,
      dateEnd: oneHourLater
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: oneHourLater,
      dateEnd: twoHoursLater
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: hour[0],
      dateEnd: hour[1]
    },
    {
      title: 'Тестируем продукт1',
      dateStart: hour[1],
      dateEnd: hour[2]
    },
    {
      title: 'Тестируем продукт2',
      dateStart: hour[2],
      dateEnd: hour[3]
    },
    {
      title: 'Тестируем продукт4',
      dateStart: hour[3],
      dateEnd: hour[4]
    },
    {
      title: 'Тестируем продукт5',
      dateStart: hour[5],
      dateEnd: hour[6]
    },
    {
      title: 'Тестируем продукт6',
      dateStart: hour[8],
      dateEnd: hour[9]
    },
    {
      title: 'Тестируем продукт6',
      dateStart: hour[9],
      dateEnd: hour[10]
    },
    
  ]);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[3].setRoom(rooms[5]));
      promises.push(events[4].setRoom(rooms[5]));
      promises.push(events[5].setRoom(rooms[5]));
      promises.push(events[6].setRoom(rooms[5]));
      promises.push(events[7].setRoom(rooms[5]));
      promises.push(events[8].setRoom(rooms[5]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
