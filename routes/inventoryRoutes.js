const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

router.get('/:productId', inventoryController.checkInventory);
router.post('/:productId/update', inventoryController.updateInventory);

module.exports = router;
