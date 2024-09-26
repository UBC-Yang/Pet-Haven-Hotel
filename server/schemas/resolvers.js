const User = require('../models/User'); // Adjust the path as necessary
const Booking = require('../models/Booking'); // Include your Booking model
const Service = require('../models/Service'); // Include your Service model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Still required for comparing existing hashed passwords
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => User.find(),
        profiles: async () => User.find(),
        services: async () => Service.find(),
        bookings: async (_, { userId }) => Booking.find({ user: userId }).populate('services'),
        getUserByEmail: async (_, { email }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new ApolloError('User not found');
            }
            return user;
        }
    },
    Mutation: {
        register: async (_, { firstName, lastName, username, email, password, pets }) => {
            // Check if all required fields are provided
            if (!firstName || !lastName || !username || !email || !password) {
                throw new ApolloError("All fields are required.");
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new ApolloError("Please enter a valid email address.");
            }
        
            // Check if the user already exists in the database
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new ApolloError("Email is already in use.");
            }
        
            // Ensure password length is sufficient
            if (password.length < 6) {
                throw new ApolloError("Password must be at least 6 characters long.");
            }
        
            // Create a new user with the plain text password
            const user = new User({ firstName, lastName, username, email, password, pets });
                await user.save();

            // Generate a JWT token for the new user
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return { token, user };
            },
        
        login: async (parent, { email, password }) => {
            // Find the user in the database by email
            const user = await User.findOne({ email });
        
            // If user is not found, throw an error
            if (!user) {
                throw new AuthenticationError('User not found');
            }
        
            // Compare the provided password with the stored password
            const validPassword = user.password === password; // Direct comparison
        
            // If the password doesn't match, throw an error
            if (!validPassword) {
                throw new AuthenticationError('Incorrect password');
            }
        
            // Generate a JWT token for the user
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        },
        bookServices: async (_, { userId, serviceIds }) => {
            const booking = new Booking({ user: userId, services: serviceIds });
            await booking.save();
            return await Booking.findById(booking.id).populate('services');
        },
        removeServiceFromBooking: async (_, { bookingId, serviceId }) => {
            const booking = await Booking.findById(bookingId);
            if (!booking) throw new ApolloError('Booking not found');

            booking.services = booking.services.filter(service => service.toString() !== serviceId);
            await booking.save();
            return await booking.populate('services');
        },
        cancelBooking: async (_, { bookingId }) => {
            const booking = await Booking.findById(bookingId);
            if (!booking) throw new ApolloError('Booking not found');

            booking.status = 'Cancelled';
            booking.refundIssued = true;
            await booking.save();
            return booking;
        }
    }
};

module.exports = resolvers;