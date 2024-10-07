const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');
const Cart = require('../models/Cart'); // Import Cart model
const Booking = require('../models/Booking'); // Assuming you have a Booking model

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      console.log("Context in me query:", context);
      if (context.user) {
        console.log("User ID in context:", context.user._id);
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('Not authenticated');
    },
    
    users: async () => {
      return User.find();
    },

    profiles: async () => {
      return User.find(); // Adjust based on how you want to get profiles
    },

    services: async () => {
      return Service.find();
    },

    bookings: async (_, { userId }) => {
      return Booking.find({ user: userId });
    },

    getCart: async (_, { userId }) => {
      return await Cart.findOne({ user: userId }).populate('items.serviceId');
    },
  },
  Mutation: {
    register: async (_, { firstName, lastName, username, email, password, pets }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, username, email, password: hashedPassword, pets });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      console.log("Generated token:", token);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token,
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
     };
    },

    addToCart: async (_, { userId, serviceId, quantity }) => {
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $addToSet: { items: { serviceId, quantity } } },
        { new: true, upsert: true }
      );
      return cart;
    },

    updateCartItem: async (_, { userId, serviceId, quantity }) => {
      const cart = await Cart.findOneAndUpdate(
        { user: userId, 'items.serviceId': serviceId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
      );
      return cart;
    },

    removeFromCart: async (_, { userId, serviceId }) => {
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { serviceId } } },
        { new: true }
      );
      return cart;
    },
  },
};

module.exports = resolvers;
