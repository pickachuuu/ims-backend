const express = require('express');
const router = express.Router();
const { createCategory, deleteCategory, updateCategory, getCategories } = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createCategory);

module.exports = router;