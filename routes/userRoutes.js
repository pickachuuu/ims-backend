const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/forgot-password', Controller.forgotPassword); // Add this line
router.post('/reset-password', Controller.resetPassword);   // Add this line

module.exports = router;