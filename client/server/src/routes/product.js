const express = require('express');
const router = express.Router();
const productController = require('../app/Controllers/ProductController');
const authMiddleware = require('../app/Middleware/Authtization');

router.post('/store',authMiddleware,productController.store);
router.get('/show',productController.show);
router.get('/detail',authMiddleware,productController.detail);
router.put('/update',authMiddleware,productController.update);
router.post('/delete',authMiddleware,productController.delete);



module.exports = router;