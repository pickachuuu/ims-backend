const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/forgot-password', Controller.forgotPassword);
router.post('/reset-password', Controller.resetPassword);
router.get('/profile', protect, Controller.getProfile);

module.exports = router;
