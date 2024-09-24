const User = require('../models/User'); // Adjust the path as necessary
const Booking = require('../models/Booking'); // Include your Booking model
const Service = require('../models/Service'); // Include your Service model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => User.find(),
        profiles: async () => User.find(),
        services: async () => Service.find(),
        bookings: async (_, { userId }) => Booking.find({ user: userId }).populate('services'),
    },
    Mutation: {
        register: async (_, { firstName, lastName, username, email, password, pets }) => {
            // Server-side validation
            if (!firstName || !lastName || !username || !email || !password) {
                throw new Error("All fields are required.");
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address.");
            }
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Email is already in use.");
            }
    
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }
    
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const user = new User({ firstName, lastName, username, email, password: hashedPassword, pets });
            await user.save();
    
            // Generate a token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
            // Return the token and user as AuthPayload
            return { token, user }; 
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new AuthenticationError('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new AuthenticationError('Invalid password');

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { token, user }; // Return token and user object
        },
        bookServices: async (_, { userId, serviceIds }) => {
            const booking = new Booking({ user: userId, services: serviceIds });
            await booking.save();
            return await Booking.findById(booking.id).populate('services'); // Ensure to return a populated booking
        },
        removeServiceFromBooking: async (_, { bookingId, serviceId }) => {
            const booking = await Booking.findById(bookingId);
            booking.services = booking.services.filter(service => service.toString() !== serviceId);
            await booking.save();
            return booking.populate('services');
        },
        cancelBooking: async (_, { bookingId }) => {
            const booking = await Booking.findById(bookingId);
            booking.status = 'Cancelled';
            booking.refundIssued = true;
            await booking.save();
            return booking;
        }
    }
};

module.exports = resolvers;