const express = require('express');
const router = express.Router();
const userController = require('../app/Controllers/UserController');
const AuthController = require('../app/Controllers/AuthController');
router.use('/login',AuthController.loginUser);
router.use('/register',AuthController.registerUser);



module.exports = router;
