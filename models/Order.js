const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  total_price: Number,
  payment_status: String,
  shipping_address: {
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  estimated_delivery: Date,
});

module.exports = mongoose.model('Order', orderSchema);
