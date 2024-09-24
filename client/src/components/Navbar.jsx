import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import { useAuth } from '../context/AuthContext'; // Use the custom hook instead

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-10">
      <div className="flex justify-between items-center mx-4">
        {/* Logo (Clickable, redirects to home) */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/hotel-logo.png"  // Path to your logo
            alt="Hotel Logo"
            className="h-32 w-32 mr-6"  // Adjust the size here
          />
          <span className="text-white text-3xl font-serif hover:text-shadow-glow">Pet Haven Hotel</span>
        </Link>

        {/* Hamburger menu for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars />
          </button>
        </div>

        {/* Navbar Links */}
        <ul className={`flex space-x-8 md:flex ${isOpen ? 'flex' : 'hidden'} md:block`}>
          <li>
            <Link to="/" className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Home</Link>
          </li>
          <li>
            <Link to="/services" className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Services</Link>
          </li>
          <li>
            <Link to="/booking" className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Booking</Link>
          </li>
          
          {/* Authenticated User Links */}
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/me" className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/registration" className="text-white text-xl hover:bg-gray-700 p-2 rounded font-sans hover:text-shadow-glow">Register</Link>
            </li>
          )}
          
          {/* Cart Icon */}
          <li className="relative">
            <Link to="/cart" className="text-white text-xl hover:bg-gray-700 p-2 rounded flex items-center font-sans hover:text-shadow-glow">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                3 {/* Replace this with dynamic count if needed */}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
