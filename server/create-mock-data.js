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
      title: '2 Ствола',
      capacity: 2,
      floor: 2
    },
    {
      title: 'У Клинта Иствуда',
      capacity: 6,
      floor: 1
    },
  ]);

  const HOUR = 60 * 60 * 1000;
  let hours = [];
  for (let i = 0; i < 15; i++) {
    const time = new Date(new Date().setHours(i + 8, 20, 0));
    hours[i] = time
  }
  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: hours[0],
      dateEnd: hours[1]
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: hours[1],
      dateEnd: hours[2]
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: hours[0],
      dateEnd: hours[1]
    },
    {
      title: 'Скажи фронтендер сколько стоит твоя жизнь',
      dateStart: hours[2],
      dateEnd: hours[3]
    },
    {
      title: 'Поиск человека, который тайно поддерживает IE6',
      dateStart: hours[4],
      dateEnd: hours[5]
    },
    {
      title: 'Почему ты не нравишься Джеку Арчибальду',
      dateStart: hours[6],
      dateEnd: hours[7]
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

      promises.push(events[3].setRoom(rooms[4]));
      promises.push(events[4].setRoom(rooms[4]));
      promises.push(events[5].setRoom(rooms[4]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
