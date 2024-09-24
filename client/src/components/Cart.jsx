import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { BiShocked } from 'react-icons/bi';
import { BsCartFill } from 'react-icons/bs';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function clearCart() {
    dispatch({ type: ADD_MULTIPLE_TO_CART, products: [] });
  }

  function submitCheckout() {
    const cartItems = state.cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.purchaseQuantity,
    }));

    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to create checkout session');
        return response.json();
      })
      .then(session => {
        return stripePromise.then(stripe => {
          return stripe.redirectToCheckout({ sessionId: session.id });
        });
      })
      .catch(error => {
        console.error('Error during checkout:', error.message);
        // Optionally, display an error message to the user
      });
  }

  if (!state.cartOpen) {
    return (
      <div className="fixed top-2 right-2 text-4xl cursor-pointer bg-blue-500 rounded-full p-2 w-12 h-12 flex items-center justify-center hover:rotate-8" onClick={toggleCart}>
        <BsCartFill className="text-white" />
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 min-w-[20%] max-w-[30%] max-h-[60%] bg-white overflow-auto p-2 shadow-lg rounded-bl-lg">
      <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:underline" onClick={toggleCart}>
        [close]
      </div>
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">CHECKOUT CART</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex justify-between mt-4">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Checkout
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
          <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4">
            Clear Cart
          </button>
        </div>
      ) : (
        <h3 className="text-center">
          <span role="img" aria-label="shocked">
            <BiShocked style={{ color: 'navy', fontSize: '50px' }} />
          </span>
          Please add a ski package of your choice.
        </h3>
      )}
    </div>
  );
};

export default Cart;