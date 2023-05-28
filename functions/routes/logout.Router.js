const express = require('express');
const router = express.Router();
const logoutCtrl = require('../controllers/logoutController')

router.get('/', logoutCtrl);

module.exports = router;