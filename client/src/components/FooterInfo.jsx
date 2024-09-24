import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

// Styled component for the info containers
const Container = ({ title, children }) => (
  <div className="flex flex-col items-start bg-white border-2 border-gray-800 rounded-lg p-10 w-full md:w-3/3 hover:bg-gray-100 transition-colors duration-300">
    <h2 className="text-3xl font-bold mb-7">{title}</h2>
    {children}
  </div>
);

const FooterInfo = () => {
  return (
    <div className="flex justify-between mt-10 mb-20 px-4 md:px-16 gap-20">
      {/* Container 1: Reservations Office */}
      <Container title="Reservations">
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <p>123 Anywhere St.</p>
        </div>
        <p className="ml-5 mb-2">Salt Lake City, UT 84101</p>
        <div className="flex items-center mb-2">
          <FaPhone className="mr-2" />
          <p>801-111-2222</p>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="mr-2" />
          <p>owner.mail@gmail.com</p>
        </div>
      </Container>

      {/* Container 2: Office Hours */}
      <Container title="Office Hours">
        <p>Monday to Friday: 9:00 AM to 6:00 PM</p>
        <p>Saturday: 9:00 AM to 12:00 Noon</p>
      </Container>

      {/* Container 3: Get Social */}
      <Container title="Socials">
        <div className="flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-5xl rounded-full p-2 hover:bg-gray-200 transition-colors duration-300" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-5xl rounded-full p-2 hover:bg-gray-200 transition-colors duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-5xl rounded-full p-2 hover:bg-gray-200 transition-colors duration-300" />
          </a>
        </div>
      </Container>
    </div>
  );
};

export default FooterInfo;
