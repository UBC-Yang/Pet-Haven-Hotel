import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(GET_SERVICES);
  const services = data?.services || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Pet Haven Hotel</h1>
          <h2>Your pet's home away from home!</h2>
          <section>
            <h3>Our Services</h3>
            {loading ? (
              <p>Loading services...</p>
            ) : (
              <ul>
                {services.map((service) => (
                  <li key={service.id}>
                    <h4>{service.name}</h4>
                    <p>Price: ${service.price}</p>
                    <p>Tier: {service.tier}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;

