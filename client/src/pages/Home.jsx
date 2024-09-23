import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(GET_SERVICES);
  const services = data?.services || [];

  return (
    <main className="mt-16 p-4"> {/* Add margin-top and padding */}
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full my-3">
          <h1 className="text-4xl font-bold">Pet Haven Hotel</h1>
          <h2 className="text-2xl my-2">Your pet's home away from home!</h2>
          <section className="mt-4">
            <h3 className="text-3xl">Our Services</h3>
            {loading ? (
              <p>Loading services...</p>
            ) : (
              <ul className="mt-4 space-y-4"> {/* Add space between items */}
                {services.map((service) => (
                  <li key={service.id} className="border rounded-lg p-4 shadow-md">
                    <h4 className="text-xl font-semibold">{service.name}</h4>
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