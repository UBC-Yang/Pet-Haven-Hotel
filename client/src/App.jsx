// root/client/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import styled from 'styled-components';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer
import { Outlet } from 'react-router-dom'; // Import Outlet

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="flex flex-col min-h-screen">
                <Navbar /> {/* Include Navbar */}
                <Container>
                    <h1>Pet Haven Hotel</h1>
                    <Outlet /> {/* This will render the child routes */}
                </Container>
                <Footer /> {/* Include Footer */}
            </div>
        </ApolloProvider>
    );
}

export default App;