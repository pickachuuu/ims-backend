const express = require('express');
const router = express.Router();
const { createSupplier, updateSupplier, deleteSupplier, deleteSuppliers, getSuppliers } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createSupplier);
router.put('/update/:supplierID', protect, updateSupplier);
router.delete('/remove/:supplierID', protect, deleteSupplier);
router.delete('/removeAll/', protect, deleteSuppliers);
router.get('/get', protect, getSuppliers);

module.exports = router;