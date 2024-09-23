import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../utils/queries';

const Services = () => {
  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  const services = data?.services || [];

  return (
    <main className="mt-16 p-4"> {/* Add margin-top and padding */}
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full my-3">
          <h1 className="text-4xl font-bold">Available Services</h1>
          <ul className="mt-4 space-y-4"> {/* Add space between items */}
            {services.map((service) => (
              <li key={service.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p>Price: ${service.price}</p>
                <p>Tier: {service.tier}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Services;