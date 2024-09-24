const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
        id: ID!
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
        id: ID!
        name: String!
        price: Float!
        tier: String!
        description: String!
    }

    type Booking {
        id: ID!
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