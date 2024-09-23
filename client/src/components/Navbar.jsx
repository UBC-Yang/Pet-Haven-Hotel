import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importing the hamburger icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-10"> {/* Fixed navbar */}
      <div className="flex justify-between items-center">
        <div className="text-white text-lg">Pet Haven Hotel</div>
        <div className="md:hidden"> {/* Hamburger icon for mobile */}
          <button onClick={toggleMenu} className="text-white">
            <FaBars />
          </button>
        </div>
        <ul className={`flex space-x-4 md:flex ${isOpen ? 'flex' : 'hidden'} md:block`}>
          <li>
            <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Home</Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:bg-gray-700 p-2 rounded">Services</Link>
          </li>
          <li>
            <Link to="/booking" className="text-white hover:bg-gray-700 p-2 rounded">Booking</Link>
          </li>
          <li>
            <Link to="/me" className="text-white hover:bg-gray-700 p-2 rounded">Profile</Link>
          </li>
          <li>
            <Link to="/registration" className="text-white hover:bg-gray-700 p-2 rounded">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;