const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Pet schema
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'Male', 'Female'], 
    },
    age: {
        type: Number,
        required: true,
        min: 0, // Ensure age is a non-negative number
    },
    breed: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
});

// Define the User schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Normalize email case
        trim: true, // Remove whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
    pets: [PetSchema], // Include pets in the User model
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;