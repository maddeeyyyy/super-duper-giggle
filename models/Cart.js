const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  size: String,
  color: String,
});

const cartSchema = new mongoose.Schema({
  user_id: String,
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
