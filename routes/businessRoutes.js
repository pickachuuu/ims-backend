const express = require('express');
const router = express.Router();
const { createBusiness } = require('../controllers/businessController');
const { protect } = require('../middlewares/authMiddleware');

// Protected route
router.post('/setup', protect, createBusiness);

module.exports = router;