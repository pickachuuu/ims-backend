const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');

router.post('/register', Controller.register);

module.exports = router;