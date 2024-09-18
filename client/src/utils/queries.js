// src/utils/queries.js
import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers {
        users {
            id
            username
            email
        }
    }
`;

export const GET_SERVICES = gql`
    query GetServices {
        services {
            id
            name
            price
            tier
        }
    }
`;

export const GET_BOOKINGS = gql`
    query GetBookings($userId: ID!) {
        bookings(userId: $userId) {
            id
            bookingDate
            status
            services {
                id
                name
                price
            }
        }
    }
`;

