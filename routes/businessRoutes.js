const express = require('express');
const router = express.Router();
const { createBusiness, editBusiness} = require('../controllers/businessController');
const { protect } = require('../middlewares/authMiddleware');

// Protected routes
router.post('/setup', protect, createBusiness);
router.put('/edit', protect, editBusiness);

module.exports = router;