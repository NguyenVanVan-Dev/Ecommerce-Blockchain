const express = require('express');
const router = express.Router();
const manageController = require('../app/Controllers/ManageController');

router.use('/:slug',manageController.show);
router.use('/',manageController.index);

module.exports = router;
