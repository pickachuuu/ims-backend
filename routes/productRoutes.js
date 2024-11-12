const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
    createProduct,
    removeProduct
    // getProducts, 
    // updateProduct, 
    // deleteProduct 
} = require('../controllers/productController');

router.post('/create', protect, createProduct);
router.delete('/:productID', protect, removeProduct);
// router.get('/', protect, getProducts);
// router.put('/:productID', protect, updateProduct);
// router.delete('/:productID', protect, deleteProduct);

module.exports = router;   