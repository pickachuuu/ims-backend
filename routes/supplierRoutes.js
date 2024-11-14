const express = require('express');
const router = express.Router();
const { createSupplier, updateSupplier } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSupplier);
router.put('/update/:supplierID', protect, updateSupplier);

module.exports = router;