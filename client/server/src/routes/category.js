const express = require('express');
const router = express.Router();
const categoryController = require('../app/Controllers/CategoryController');
const authMiddleware = require('../app/Middleware/Authtization')
router.post('/store',authMiddleware,categoryController.store);
router.get('/show',categoryController.show.bind(categoryController));
router.get('/detail',authMiddleware,categoryController.detail);
router.put('/update',authMiddleware,categoryController.update);
router.post('/delete',authMiddleware,categoryController.delete);



module.exports = router;