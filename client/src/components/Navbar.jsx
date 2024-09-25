// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { isAuthenticated, logout } = useAuth(); 
  const { cart } = useCart(); 
  const itemCount = cart.length;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <nav className="bg-[rgb(31,41,55,0.9)] p-4 fixed w-full z-10">
      <div className="flex justify-between items-center mx-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/hotel-logo.png"
            alt="Hotel Logo"
            className="h-32 w-32 mr-6"
          />
          <span className="text-white text-5xl font-serif hover:text-shadow-glow">Pet Haven Hotel</span>
        </Link>

        {/* Hamburger menu for mobile */}
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
          <li>
            <Link to="/products" className="text-white text-2xl hover:bg-gray-700 p-6 rounded font-sans hover:text-shadow-glow">Products</Link> {/* New Products Link */}
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
                  {itemCount}
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
            <li>
              <Link to="/products" className="text-gray-800 text-lg hover:bg-gray-200 p-2 rounded" onClick={handleLinkClick}>Products</Link> {/* Mobile Products Link */}
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
                    {itemCount}
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
