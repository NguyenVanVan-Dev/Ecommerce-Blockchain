const express = require('express');
const router = express.Router();
const authController = require('../app/Controllers/AuthController');

router.use('/login',authController.login);
router.post('/register',authController.register);


module.exports = router;