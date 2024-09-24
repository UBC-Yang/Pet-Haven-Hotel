const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        bookings: [Booking]
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
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): String
        bookServices(userId: ID!, serviceIds: [ID!]!): Booking
        removeServiceFromBooking(bookingId: ID!, serviceId: ID!): Booking
        cancelBooking(bookingId: ID!): Booking
    }
`;

module.exports = typeDefs;
