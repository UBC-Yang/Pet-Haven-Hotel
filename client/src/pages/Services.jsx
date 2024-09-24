import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BOOK_SERVICES } from '../utils/mutations';

// Updated servicesList with images
const servicesList = [
    {
        id: '1',
        name: 'Basic',
        description: 'Pamper your pet with our essential spa services, perfect for a quick refresh. This package includes a gentle shampoo bath, a thorough coat brushing, ear cleaning, and a nail trim. Your pet will leave feeling clean and rejuvenated.',
        price: 20,
        tier: 'Basic',
        image: 'images/basic.jpg',  // Add image path
    },
    {
        id: '2',
        name: 'Standard',
        description: 'Upgrade your pet’s spa experience with our Standard Package. Along with all the Basic services, your pet will enjoy a deep conditioning treatment to soften and detangle their coat, followed by a relaxing paw massage. This package also includes a spritz of our signature pet-safe fragrance.',
        price: 40,
        tier: 'Standard',
        image: '/images/standard.jpg',  // Add image path
    },
    {
        id: '3',
        name: 'Premium',
        description: 'Our Premium Package offers a luxurious spa experience for your pet. In addition to all Standard services, this package includes a soothing oatmeal or hypoallergenic bath tailored to their skin type, teeth brushing for fresh breath, and a blueberry facial to brighten their fur. Your pet will feel pampered from head to tail.',
        price: 60,
        tier: 'Premium',
        image: '/images/premium.jpg',  // Add image path
    },
    {
        id: '4',
        name: 'Deluxe',
        description: 'For the ultimate spa indulgence, treat your pet to our Deluxe Package. This all-inclusive experience features everything from the Premium Package, plus a full-body massage to ease tension, a warm towel wrap for deep relaxation, and a personalized grooming session tailored to their unique style. We will finish with a gourmet treat and a complimentary bandana or bow.',
        price: 80,
        tier: 'Deluxe',
        image: '/images/deluxe.jpg',  // Add image path
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
        <main className="mt-16 p-4 pt-20">
            <div className="flex flex-col items-center">
                <div className="max-w-2xl w-full my-3">
                    <h1 className="text-4xl font-bold">Available Services</h1>
                    <ul className="mt-4 space-y-4">
                        {servicesList.map((service) => (
                            <li key={service.id} className="border rounded-lg p-4 shadow-md">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-48 object-cover mb-4 rounded-lg"
                                />
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