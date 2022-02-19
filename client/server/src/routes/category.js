const express = require('express');
const router = express.Router();
const categoryController = require('../app/Controllers/CategoryController');

router.post('/store',categoryController.store);



module.exports = router;