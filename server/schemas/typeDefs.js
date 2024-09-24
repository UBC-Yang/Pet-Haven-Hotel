const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Pet {
        name: String!
        gender: String!
        age: String!
        breed: String!
        notes: String!
    }

    type User {
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
        email: String!
        bookings: [Booking]
        pets: [Pet] 
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
        register(username: String!, firstName: String!, lastName: String!, email: String!, password: String!, pets: [PetInput]!): User
        login(email: String!, password: String!): String
        bookServices(userId: ID!, serviceIds: [ID!]!): Booking
        removeServiceFromBooking(bookingId: ID!, serviceId: ID!): Booking
        cancelBooking(bookingId: ID!): Booking
    }

    input PetInput {
        name: String!
        gender: String!
        age: String!
        breed: String!
        notes: String!
    }
`;

module.exports = typeDefs;