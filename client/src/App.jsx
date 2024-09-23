import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import styled from 'styled-components';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer
import { Outlet } from 'react-router-dom'; // Import Outlet
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    flex-grow: 1; // Ensure the container takes up available space
`;

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider> {/* Wrap your app in AuthProvider */}
                <div className="flex flex-col min-h-screen">
                    <Navbar /> {/* Include Navbar */}
                    <Container>
                        <Outlet /> {/* This will render the child routes */}
                    </Container>
                    <Footer /> {/* Include Footer */}
                </div>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;