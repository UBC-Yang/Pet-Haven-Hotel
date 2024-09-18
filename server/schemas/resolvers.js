const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

const resolvers = {
    Query: {
        users: async () => User.find(),
        services: async () => Service.find(),
        bookings: async (_, { userId }) => Booking.find({ user: userId }).populate('services')
    },
    Mutation: {
        register: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            await user.save();
            return user;
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
            
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');
            
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return token;
        },
        bookServices: async (_, { userId, serviceIds }) => {
            const booking = new Booking({ user: userId, services: serviceIds });
            await booking.save();
            return booking.populate('services');
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

