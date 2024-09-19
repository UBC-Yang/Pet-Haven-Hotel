import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

function App() {
    return (
        <ApolloProvider client={client}>
            <Container>
                <h1>Pet Haven Hotel</h1>
                {/* Outlet will render child routes */}
                <Outlet />
            </Container>
        </ApolloProvider>
    );
}

export default App;
