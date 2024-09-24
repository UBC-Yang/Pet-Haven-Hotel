import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BOOK_SERVICES } from '../utils/mutations';

const servicesList = [
    {
        id: '1',
        name: 'Basic',
        description: 'A basic package offering essential care services for your pet.',
        price: 20,
        tier: 'Basic'
    },
    {
        id: '2',
        name: 'Standard',
        description: 'Standard package with additional grooming services.',
        price: 40,
        tier: 'Standard'
    },
    {
        id: '3',
        name: 'Premium',
        description: 'Premium package including advanced care and special treatment.',
        price: 60,
        tier: 'Premium'
    },
    {
        id: '4',
        name: 'Deluxe',
        description: 'Deluxe package with all-inclusive services for your pet.',
        price: 80,
        tier: 'Deluxe'
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookServices] = useMutation(BOOK_SERVICES);

    const handleBookNow = async (serviceId) => {
        if (!bookingDate || !bookingTime) {
            alert("Please select a date and time.");
            return;
        }
        
        try {
            const { data } = await bookServices({
                variables: {
                    userId: "CURRENT_USER_ID",  // Replace with actual user ID from auth context
                    serviceIds: [serviceId]
                }
            });

            alert('Service booked successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to book service.');
        }
    };

    return (
        <main className="mt-16 p-4">
            <div className="flex flex-col items-center">
                <div className="max-w-2xl w-full my-3">
                    <h1 className="text-4xl font-bold">Available Services</h1>
                    <ul className="mt-4 space-y-4">
                        {servicesList.map((service) => (
                            <li key={service.id} className="border rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-semibold">{service.name}</h2>
                                <p>{service.description}</p>
                                <p>Price: ${service.price}</p>
                                
                                <div className="mt-4">
                                    <label>Date: </label>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        className="border rounded p-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label>Time: </label>
                                    <input
                                        type="time"
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        className="border rounded p-2"
                                    />
                                </div>

                                <button
                                    onClick={() => handleBookNow(service.id)}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Book Now
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Services;
