import { gql } from '@apollo/client';

// Existing exports
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id  # Changed from id to _id
      username
      email
    }
  }
`;

export const GET_SERVICES = gql`
  query GetServices {
    services {
      _id  # Changed from id to _id
      name
      price
      tier
    }
  }
`;

export const GET_BOOKINGS = gql`
  query GetBookings($userId: ID!) {
    bookings(userId: $userId) {
      _id  # Changed from id to _id
      user {
        _id  # Changed from id to _id
        username
      }
      services {
        _id  # Changed from id to _id
        name
        price
      }
      bookingDate
      status
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      _id  # Changed from id to _id
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
`;

// New exports for cart management
export const GET_CART = gql`
  query GetCart {
    getCart {
      items {
        serviceId {
          _id  # Ensure this matches your Service model
          name
          price
        }
        quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($serviceId: ID!, $quantity: Int!) {
    updateCartItem(serviceId: $serviceId, quantity: $quantity) {
      items {
        serviceId {
          _id  # Ensure this matches your Service model
          name
        }
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($serviceId: ID!) {
    removeFromCart(serviceId: $serviceId) {
      items {
        serviceId {
          _id  # Ensure this matches your Service model
          name
        }
        quantity
      }
    }
  }
`;
