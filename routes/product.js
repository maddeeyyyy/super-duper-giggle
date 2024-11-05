// routes/posts.js
const express = require('express');
const { getAllPosts, searchProducts } = require('../controllers/productController');
const router = express.Router();


router.get('/', getAllPosts);
router.get('/search', searchProducts);

module.exports = router;
