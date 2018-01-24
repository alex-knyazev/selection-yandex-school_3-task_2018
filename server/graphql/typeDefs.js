module.exports = `
scalar Date

type User {
    id: ID!
    login: String!
    homeFloor: Int
    avatarUrl: String!
}

input UserCreateInput {
    login: String!
    homeFloor: Int,
    avatarUrl: String!
}

input UserUpdateInput {
    login: String
    homeFloor: Int,
    avatarUrl: String
}

type Room {
    id: ID!
    title: String!
    capacity: Int!
    floor: Int!
}

input RoomCreateInput {
    title: String!
    capacity: Int!
    floor: Int!
}

input RoomUpdateInput {
    title: String
    capacity: Int
    floor: Int
}

type Event {
    id: ID!
    title: String!
    dateStart: Date!
    dateEnd: Date!
    users: [User]
    room: Room
}

input EventCreateInput {
    title: String!
    dateStart: Date!
    dateEnd: Date!
}

input EventUpdateInput {
    title: String
    dateStart: Date
    dateEnd: Date
}

type Query {
  user(id: ID!): User
  users: [User]
  event(id: ID!): Event
  events: [Event]
  room(id: ID!): Room
  rooms: [Room]
}

type Mutation {
  createUser(input: UserCreateInput!): User
  updateUser(id: ID!, input: UserUpdateInput!): User
  removeUser(id: ID!): User

  createRoom(input: RoomCreateInput!): Room
  updateRoom(id: ID!, input: RoomUpdateInput!): Room
  removeRoom(id: ID!): Room

  createEvent(input: EventCreateInput!, usersIds: [ID], roomId: ID!): Event
  updateEvent(id: ID!, input: EventUpdateInput!): Event
  removeUserFromEvent(id: ID!, userId: ID!): Event
  removeUsersFromEvent(id: ID!, usersIds: [ID]): Event
  addUserToEvent(id: ID!, userId: ID!): Event
  addUsersToEvent(id: ID!, usersIds: [ID]): Event
  changeEventRoom(id: ID!, roomId: ID!): Event
  removeEvent(id: ID!): Event
}

union SearchResult = User | Event | Room

schema {
  query: Query
  mutation: Mutation
}
`;
