import React from 'react';

const Services = () => {
  const services = [
    { id: 1, name: 'Pet Boarding', description: 'Comfortable boarding for your pets.' },
    { id: 2, name: 'Pet Grooming', description: 'Professional grooming services for all breeds.' },
    { id: 3, name: 'Dog Walking', description: 'Daily walks and exercise for your dog.' },
    { id: 4, name: 'Veterinary Services', description: 'On-site vet services for checkups and emergencies.' }
  ];

  return (
    <div>
      <h2>Our Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;