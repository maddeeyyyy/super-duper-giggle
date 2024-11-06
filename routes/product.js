// routes/posts.js
const express = require('express');
const { getAllPosts, searchProducts, updateStock } = require('../controllers/productController');
const router = express.Router();


router.get('/', getAllPosts);
router.get('/search', searchProducts);
// router.patch('/products/:productId/stock', updateStock)

module.exports = router;
