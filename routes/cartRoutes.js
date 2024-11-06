const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/:userId', cartController.viewCart);
router.post('/:userId/update', cartController.updateCartItem);
router.delete('/:userId/remove', cartController.removeFromCart);

module.exports = router;
