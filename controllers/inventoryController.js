const Product = require('../models/Product');

exports.checkInventory = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send({ message: 'Product not found' });
  res.send({ _id: product._id, title: product.title, stock: product.stock });
};

exports.updateInventory = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send({ message: 'Product not found' });
  
  product.stock = req.body.stock;
  await product.save();
  res.send({ _id: product._id, stock: product.stock });
};
