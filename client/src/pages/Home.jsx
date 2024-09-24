import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel'; // Import the carousel
import FooterInfo from '../components/FooterInfo'; // Import the new FooterInfo component

const Home = () => {
  return (
    <main className="mt-16">
      <div className="flex flex-col items-center">
        {/* Image Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <ImageCarousel />
        </div>

        {/* Welcome Section */}
        <div className="w-full px-4 lg:px-24 text-center my-8">
          <h1 className="text-4xl font-bold">Pet Haven Hotel</h1>
          <h2 className="text-2xl my-2">Your pet's home away from home!</h2>
          <section className="mt-6">
            <h3 className="text-2xl">Welcome to Pet Haven Hotel</h3>
            <p className="mt-4">
              At Pet Haven Hotel, we provide a luxurious and caring environment for your beloved pets.
              Our experienced staff is dedicated to ensuring that every pet receives personalized attention and care.
            </p>
            <p className="mt-4">
              We offer a variety of services tailored to your pet's needs, including grooming, spa treatments,
              and comfortable accommodations. Your pet will enjoy playtime, relaxation, and a home-like atmosphere
              while you’re away.
            </p>
            <p className="mt-4">
              Come and experience the best in pet hospitality at Pet Haven Hotel. Your furry friend will thank you!
            </p>
          </section>
        </div>

        {/* Services Button */}
        <div className="mt-10">
          <Link to="/services">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-600 transition duration-300">
              Check Out Our Services!
            </button>
          </Link>
        </div>

        {/* Testimonials Section */}
        <div className="relative w-full mt-20 mb-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center h-96"
            style={{ backgroundImage: "url('/images/dog-tub.jpg')" }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-40"></div>
          </div>

          {/* Centered Testimonials */}
          <div className="relative z-100 flex flex-col items-center justify-center h-full p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">In The Press</h2>
            <div className="flex flex-wrap justify-center gap-20">
              {/* Testimonial 1 */}
              <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-lg text-gray-800 max-w-xs z-100">
                <p className="italic">
                  "I can’t recommend Pet Haven Hotel enough! You guys! The luxurious spa services transformed my anxious dog into a calm and happy pup. It is the best! The staff is incredibly attentive and truly understands how to pamper pets."
                </p>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-lg text-gray-800 max-w-xs z-100">
                <p className="italic">
                  "Pet Haven Hotel is more than just a place to stay; it's a spa retreat for my cat! The grooming services are exceptional, and I appreciate the holistic approach to pet care. My fur baby always looks and feels amazing after her stays!"
                </p>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-lg text-gray-800 max-w-xs z-100">
                <p className="italic">
                  "Pet Haven Hotel is a true paradise for my pup! The spa treatments are top-notch, and I love that they offer massages and facials for pets. My dog comes home feeling relaxed and rejuvenated!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Information Section */}
        <FooterInfo /> {/* Add FooterInfo here */}
      </div>
    </main>
  );
};

export default Home;
