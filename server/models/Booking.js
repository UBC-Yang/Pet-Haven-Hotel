const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    checkInDate: String,
    checkOutDate: String
});

module.exports = mongoose.model('Booking', bookingSchema);