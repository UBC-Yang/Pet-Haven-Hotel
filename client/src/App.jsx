import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <div className="flex-grow max-w-full mx-auto p-5 md:p-10">
                            <Outlet />
                        </div>
                        <Footer className="mt-auto" />
                    </div>
                </CartProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;