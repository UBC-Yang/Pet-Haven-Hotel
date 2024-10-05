// client/src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART } from '../graphql/queries'; // Adjust paths as needed

const Cart = () => {
  const { loading, data } = useQuery(GET_CART);
  const [updateCartItem] = useMutation(UPDATE_CART_ITEM);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (data && data.getCart) {
      setCartItems(data.getCart.items);
    }
  }, [data]);

  const handleQuantityChange = (serviceId, quantity) => {
    updateCartItem({ variables: { serviceId, quantity } });
  };

  const handleRemoveItem = (serviceId) => {
    removeFromCart({ variables: { serviceId } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.serviceId}>
          <h2>{item.serviceId.name}</h2>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.serviceId, parseInt(e.target.value))}
          />
          <button onClick={() => handleRemoveItem(item.serviceId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
