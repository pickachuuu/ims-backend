const express = require('express');
const router = express.Router();
const { createCategory, deleteCategory, updateCategory, getCategories } = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createCategory);
router.delete('/delete/:categoryID', protect, deleteCategory);
router.put('/update/:categoryID', protect, updateCategory);
router.get('/get', protect, getCategories);
module.exports = router;