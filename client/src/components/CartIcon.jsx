import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCartFill } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';

const CartIcon = () => {
  const { cartState } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const itemCount = cartState.cart.reduce((total, item) => total + item.quantity, 0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative">
        <BsCartFill className="text-3xl text-white" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
          {cartState.cart.length === 0 ? (
            <div className="p-4 text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="p-4">
              {cartState.cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-600">{item.quantity} x ${item.price}</p>
                  </div>
                  <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between items-center py-2 font-semibold">
                <span>Total:</span>
                <span>${cartState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </li>
              <li className="text-center mt-2">
                <Link to="/cart" className="text-blue-500 hover:underline">View Cart</Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
