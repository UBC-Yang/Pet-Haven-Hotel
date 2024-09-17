import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const GET_PETS = gql`
    query GetPets {
        pets {
            id
            name
            type
        }
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

function PetList() {
    const { loading, error, data } = useQuery(GET_PETS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Available Pets</h2>
            <List>
                {data.pets.map(pet => (
                    <li key={pet.id}>{pet.name} ({pet.type})</li>
                ))}
            </List>
        </div>
    );
}

export default PetList;