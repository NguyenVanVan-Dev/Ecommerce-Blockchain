const express = require('express');
const router = express.Router();
const productController = require('../app/Controllers/ProductController');
const authMiddleware = require('../app/Middleware/Authtization');
const Uploadfile = require('../app/Middleware/Uploadfile');
router.post('/store',authMiddleware,Uploadfile.single('image'),productController.store);
router.get('/show',productController.show);
router.get('/detail',authMiddleware,productController.detail);
router.put('/update',authMiddleware,productController.update);
router.post('/delete',authMiddleware,productController.delete);



module.exports = router;