import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import BookingForm from './components/BookingForm';
import PetList from './components/PetList';
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
                <BookingForm />
                <PetList />
            </Container>
        </ApolloProvider>
    );
}

export default App;