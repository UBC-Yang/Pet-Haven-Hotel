import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar'; // Import Navbar

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

function App() {
    return (
        <ApolloProvider client={client}>
            <Container>
                <Navbar /> {/* Include Navbar here */}
                <h1>Pet Haven Hotel</h1>
                <Outlet />
            </Container>
        </ApolloProvider>
    );
}

export default App;

