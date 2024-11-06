const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.post('/initiate', checkoutController.initiateCheckout);
router.post('/complete', checkoutController.completeCheckout);

module.exports = router;
