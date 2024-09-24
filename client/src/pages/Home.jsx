import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel'; // Import the carousel

const Home = () => {
  // const { loading, data } = useQuery(GET_SERVICES);
  // const services = data?.services || [];

  return (
    <main className="mt-16 p-4">
      <div className="flex flex-col items-center pt-20">
        <ImageCarousel /> {/* Use the carousel here */}
        <div className="max-w-2xl w-full my-3">
          <h1 className="text-4xl font-bold">Pet Haven Hotel</h1>
          <h2 className="text-2xl my-2">Your pet's home away from home!</h2>
          <section className="mt-4">
            <h3 className="text-2xl">Welcome to Pet Haven Hotel</h3>
            <p className="mt-2">
              At Pet Haven Hotel, we provide a luxurious and caring environment for your beloved pets. 
              Our experienced staff is dedicated to ensuring that every pet receives personalized attention and care.
            </p>
            <p className="mt-2">
              We offer a variety of services tailored to your pet's needs, including grooming, spa treatments, 
              and comfortable accommodations. Your pet will enjoy playtime, relaxation, and a home-like atmosphere 
              while you’re away.
            </p>
            <p className="mt-2">
              Come and experience the best in pet hospitality at Pet Haven Hotel. Your furry friend will thank you!
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link to="/services">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition duration-300">
              Check Out Our Services!
            </button>
          </Link>
        </div>

        <div className="mt-8 mb-12"></div>

      </div>
    </main>
  );
};

export default Home;

