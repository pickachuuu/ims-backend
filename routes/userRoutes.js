const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getProfile, updateUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register',register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getProfile);
router.put('/update', protect, updateUser);

module.exports = router;
