import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!, $pets: [PetInput]!) {
    registerUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password, pets: $pets) {
      token
      user {
        _id
        username
        email
        pets {
          name
          gender
          age
          breed
          notes
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const BOOK_SERVICES = gql`
    mutation BookServices($userId: ID!, $serviceIds: [ID!]!) {
        bookServices(userId: $userId, serviceIds: $serviceIds) {
            id
            user {
                id
                username
            }
            services {
                id
                name
                price
            }
        }
    }
`;

export const REMOVE_SERVICE_FROM_BOOKING = gql`
    mutation RemoveServiceFromBooking($bookingId: ID!, $serviceId: ID!) {
        removeServiceFromBooking(bookingId: $bookingId, serviceId: $serviceId) {
            id
            services {
                id
                name
                price
            }
        }
    }
`;

export const CANCEL_BOOKING = gql`
    mutation CancelBooking($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId) {
            id
            status
            refundIssued
        }
    }
`;

