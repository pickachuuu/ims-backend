const express = require('express');
const router = express.Router();
const { createSupplier } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSupplier);

module.exports = router;