import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../utils/queries';

const Services = () => {
  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const services = data?.services || [];

  return (
    <div>
      <h1>Available Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h2>{service.name}</h2>
            <p>Price: ${service.price}</p>
            <p>Tier: {service.tier}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;