const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity, size, color } = req.body;
  const product = await Product.findById(product_id);
  if (!product) return res.status(404).send({ message: 'Product not found' });

  let cart = await Cart.findOne({ user_id });
  if (!cart) cart = new Cart({ user_id, items: [] });

  const cartItem = cart.items.find(item => 
    item.product.equals(product_id) && item.size === size && item.color === color
  );

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.items.push({ product: product_id, quantity, size, color });
  }

  await cart.save();
  res.send({ message: 'Item added to cart successfully' });
};

exports.viewCart = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.params.userId }).populate('items.product');
  if (!cart) return res.status(404).send({ message: 'Cart not found' });
  
  res.send(cart.items.map(item => ({
    _id: item.product._id,
    title: item.product.title,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    price: item.product.price
  })));
};

exports.updateCartItem = async (req, res) => {
  const { product_id, quantity, size, color } = req.body;
  const cart = await Cart.findOne({ user_id: req.params.userId });
  
  if (!cart) return res.status(404).send({ message: 'Cart not found' });
  
  const cartItem = cart.items.find(item =>
    item.product.equals(product_id) && item.size === size && item.color === color
  );
  
  if (!cartItem) return res.status(404).send({ message: 'Item not found in cart' });
  
  cartItem.quantity = quantity;
  await cart.save();
  
  res.send({ message: 'Cart updated successfully' });
};

exports.removeFromCart = async (req, res) => {
  const { product_id, size, color } = req.body;
  const cart = await Cart.findOne({ user_id: req.params.userId });
  
  if (!cart) return res.status(404).send({ message: 'Cart not found' });
  
  cart.items = cart.items.filter(item =>
    !(item.product.equals(product_id) && item.size === size && item.color === color)
  );
  await cart.save();
  
  res.send({ message: 'Item removed from cart successfully' });
};
