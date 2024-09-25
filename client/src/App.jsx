// client/src/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const Container = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    flex-grow: 1; 

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <Container className="flex-grow">
                            <Outlet />
                        </Container>
                        <Footer className="mt-auto" />
                    </div>
                </CartProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
