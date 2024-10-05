const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
        _id: ID!  # Changed from id to _id
        username: String!
        firstName: String!
        lastName: String!
        email: String!
        bookings: [Booking]
        pets: [Pet]
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Service {
        _id: ID!  # Changed from id to _id
        name: String!
        price: Float!
        tier: String!
        description: String!
    }

    type Booking {
        _id: ID!  # Changed from id to _id
        user: User!
        services: [Service]
        bookingDate: String!
        status: String!
        refundIssued: Boolean!
    }

    type Query {
        users: [User]
        profiles: [User]
        services: [Service]
        bookings(userId: ID!): [Booking]
        getUserByEmail(email: String!): User
    }

    type Mutation {
        register(firstName: String!, lastName: String!, username: String!, email: String!, password: String!, pets: [PetInput!]!): AuthPayload
        login(email: String!, password: String!): AuthPayload  # Updated to return AuthPayload
        bookServices(userId: ID!, serviceIds: [ID!]!): Booking
        removeServiceFromBooking(bookingId: ID!, serviceId: ID!): Booking
        cancelBooking(bookingId: ID!): Booking
    }

    type Pet {
        name: String!
        gender: String!
        age: Int!
        breed: String!
        notes: String!
    }

    input PetInput {
        name: String!
        gender: String!
        age: Int!
        breed: String!
        notes: String!
    }
`;

module.exports = typeDefs;