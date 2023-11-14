import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    place_id: [ID]
    place: [Place]
    booking_id: [ID]
    booking: [Booking]
  }
  type Query {
    users: [User]!
    user(email: String): User
    userById(userid: ID): User
    userPlaces(email: String): [Place]
    allPlaces: [Place]
    singlePlace(placeid: ID): Place
    singleBooking(id: ID): Booking
    allBookings: [Booking]
  }

  input addUserInputs {
    name: String!
    email: String!
    password: String!
  }
  type Place {
    id: ID!
    title: String!
    address: String!
    photos: [String]
    description: String
    wifi: Boolean
    privateParking: Boolean
    tv: Boolean
    pets: Boolean
    privateEntrance: Boolean
    foodBeverage: Boolean
    extraInfo: String
    checkInTime: Int!
    checkOutTime: Int!
    maxGuests: Int!
    user_id: ID!
    price: Int!
    booking_id: [ID!]
    user: User
    booking: [Booking]
  }
  type Booking {
    id: ID!
    checkInDate: String
    checkOutDate: String
    numGuests: Int
    phoneNum: String
    bookingAmount: Int
    numNights: Int
    place_id: ID
    bookingUser_id: ID
    place: Place
    user: User
  }

  type Mutation {
    addUser(user: addUserInputs!): User
    addPlace(email: String!, place: addPlace!): Place
    editPlace(id: ID!, edits: editPlace): Place
    addBooking(bookingData: addBookingData!): Booking
  }
  input addUserInputs {
    name: String!
    email: String!
    password: String!
  }
  input addPlace {
    title: String!
    address: String!
    photos: [String]
    description: String
    wifi: Boolean
    privateParking: Boolean
    tv: Boolean
    pets: Boolean
    privateEntrance: Boolean
    foodBeverage: Boolean
    extraInfo: String
    checkInTime: Int!
    checkOutTime: Int!
    maxGuests: Int!
    price: Int!
  }
  input editPlace {
    title: String
    address: String
    photos: [String]
    description: String
    wifi: Boolean
    privateParking: Boolean
    tv: Boolean
    pets: Boolean
    privateEntrance: Boolean
    foodBeverage: Boolean
    extraInfo: String
    checkInTime: Int
    checkOutTime: Int
    maxGuests: Int
    price: Int
  }
  input addBookingData {
    checkInDate: String
    checkOutDate: String
    numGuests: Int
    phoneNum: String
    bookingAmount: Int
    numNights: Int
    bookingUser_id: ID
    place_id: ID
  }
`;
