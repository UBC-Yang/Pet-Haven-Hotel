import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS } from '../utils/queries';

const Profile = () => {
  const userId = "CURRENT_USER_ID"; // Replace this with the actual user ID
  const { loading, error, data } = useQuery(GET_BOOKINGS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bookings = data.bookings || [];

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Upcoming Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>Date: {booking.bookingDate}</p>
              <p>Status: {booking.status}</p>
              <h3>Services:</h3>
              <ul>
                {booking.services.map((service) => (
                  <li key={service.id}>
                    {service.name} - ${service.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </div>
  );
};

export default Profile;
