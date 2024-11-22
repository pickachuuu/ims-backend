const express = require('express');
const router = express.Router();
const { createSupplier, updateSupplier, deleteSupplier, getSuppliers } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSupplier);
router.put('/update/:supplierID', protect, updateSupplier);
router.delete('/remove/:supplierID', protect, deleteSupplier);
router.get('/get', protect, getSuppliers);

module.exports = router;