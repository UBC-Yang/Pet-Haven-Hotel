// server/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
