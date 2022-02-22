const express = require('express');
const router = express.Router();
const categoryController = require('../app/Controllers/CategoryController');

router.post('/store',categoryController.store);
router.get('/show',categoryController.show);
router.get('/detail',categoryController.detail);
router.put('/update',categoryController.update);
router.post('/delete',categoryController.delete);



module.exports = router;