const express = require('express');
const router = express.Router();
const authController = require('../app/Controllers/AuthController');
const refeshAuthorization = require('../app/Middleware/RefeshAuthtization')
router.post('/login',authController.login);
router.post('/login/google',authController.loginGoogle);
router.post('/register',authController.register);
router.post('/reset-login',refeshAuthorization,authController.resetLogin);
router.put('/forgot-password',authController.forgotPassword);
router.put('/reset-password',authController.resetPassword);


module.exports = router;