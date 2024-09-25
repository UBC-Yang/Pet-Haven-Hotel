import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import { useAuth } from '../context/AuthContext'; // Use the custom hook instead
import { useCart } from '../context/CartContext'; // Import the cart context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const { cart, addToCart, removeFromCart, toggleCart } = useCart(); // Get cart state from context
  const itemCount = cart.length; // Calculate the number of items in the cart

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close dropdown when a link is clicked
  };

  return (
    <nav className="bg-[rgb(31,41,55,0.9)] p-4 fixed w-full z-10">
      <div className="flex justify-between items-center mx-4">
        {/* Logo (Clickable, redirects to home) */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/hotel-logo.png"  // Path to your logo
            alt="Hotel Logo"
            className="h-32 w-32 mr-6"  // Adjust the size here
          />
          <span className="text-white text-5xl font-serif hover:text-shadow-glow">Pet Haven Hotel</span>
        </Link>

        {/* Hamburger menu for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars />
          </button>
        </div>

        {/* Navbar Links */}
        <ul className={`hidden md:flex space-x-8`}>
          <li>
            <Link to="/" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Home</Link>
          </li>
          <li>
            <Link to="/services" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Services</Link>
          </li>
          <li>
            <Link to="/booking" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Booking</Link>
          </li>
          
          {/* Authenticated User Links */}
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/me" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/registration" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Register</Link>
            </li>
          )}
          
          {/* Cart Icon */}
          <li className="relative">
            <Link to="/cart" className="text-white text-xl hover:bg-gray-700 p-2 rounded flex items-center font-sans hover:text-shadow-glow">
              <FaShoppingCart className="text-2xl" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {itemCount} {/* Dynamic count of items */}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-70 rounded-lg p-4 mt-2 absolute right-0 mx-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Services</Link>
            </li>
            <li>
              <Link to="/booking" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Booking</Link>
            </li>
            {/* Authenticated User Links */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/me" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Profile</Link>
                </li>
                <li>
                  <button onClick={() => { handleLinkClick(); logout(); }} className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/registration" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Register</Link>
              </li>
            )}
            {/* Cart Icon */}
            <li className="relative">
              <Link to="/cart" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded flex items-center" onClick={handleLinkClick}>
                <FaShoppingCart className="text-2xl" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                    {itemCount} {/* Dynamic count of items */}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
