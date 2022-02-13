const express = require('express');
const router = express.Router();
const userController = require('../app/Controllers/UserController');

router.use('/create',userController.create);
router.use('/store',userController.store);


module.exports = router;
