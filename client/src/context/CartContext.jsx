import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const TOGGLE_CART = 'TOGGLE_CART';

// Define an initial state
const initialState = {
    cart: [],
    cartOpen: false,
};

// Create a reducer to handle the cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload),
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };
        default:
            return state;
    }
};

// Create a provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: ADD_TO_CART, payload: item });
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: REMOVE_FROM_CART, payload: itemId });
    };

    const toggleCart = () => {
        dispatch({ type: TOGGLE_CART });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

export default CartContext;
