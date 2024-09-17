import React from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const ADD_BOOKING = gql`
    mutation AddBooking($petId: ID!, $checkInDate: String!, $checkOutDate: String!) {
        addBooking(petId: $petId, checkInDate: $checkInDate, checkOutDate: $checkOutDate) {
            id
            checkInDate
            checkOutDate
        }
    }
`;

const Form = styled.form`
    margin-bottom: 20px;
`;

function BookingForm() {
    const [addBooking] = useMutation(ADD_BOOKING);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Book Your Pet</h2>
            {/* Form fields */}
        </Form>
    );
}

export default BookingForm;