import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer

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
                    <Outlet />
                </Container>
                <Footer /> {/* Include Footer */}
            </div>
        </ApolloProvider>
    );
}

export default App;