const express = require('express');
const router = express.Router();
const { createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSupplier);
router.put('/update/:supplierID', protect, updateSupplier);
router.delete('/remove/:supplierID', protect, deleteSupplier);
module.exports = router;