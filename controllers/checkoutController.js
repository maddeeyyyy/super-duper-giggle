const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.initiateCheckout = async (req, res) => {
  const { user_id, shipping_address } = req.body;
  const cart = await Cart.findOne({ user_id }).populate('items.product');
  if (!cart) return res.status(404).send({ message: 'Cart not found' });

  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  res.send({
    total_price: totalPrice,
    estimated_delivery: '2024-11-10',
    message: 'Checkout initiated successfully'
  });
};

exports.completeCheckout = async (req, res) => {
  const { user_id, payment_info, shipping_address } = req.body;
  const cart = await Cart.findOne({ user_id }).populate('items.product');
  
  if (!cart) return res.status(404).send({ message: 'Cart not found' });
  
  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = new Order({
    user_id,
    cart: cart._id,
    total_price: totalPrice,
    payment_status: 'Paid',
    shipping_address,
    estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  
  await order.save();
  await cart.remove();  // Clear the cart
  
  res.send({ order_id: order._id, status: 'Success', message: 'Order placed successfully' });
};
