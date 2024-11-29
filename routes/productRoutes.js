const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
    createProduct,
    removeProduct,
    removeProducts,
    updateProduct,
    getProducts,
    getLowStockProducts
} = require('../controllers/productController');

router.post('/create', protect, createProduct);
router.delete('/delete/:productID', protect, removeProduct);
router.delete('/deleteAll/', protect, removeProducts);
router.put('/update/:productID', protect, updateProduct);
router.get('/get', protect, getProducts);
router.get('/low-stock', protect, getLowStockProducts);

module.exports = router;   