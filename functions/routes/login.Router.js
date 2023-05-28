const express= require('express');
const router = express.Router();
// const { query } = require('express-validator');
// const validateReq = require('../middleware/validateRequest');
const logiCtrl  = require('../controllers/loginController')

router.post(
    '/', 
    // query('email')
    // .isEmail()
    // .withMessage('Enter a valid email address')
    // .normalizeEmail(),
    // query('password').not().isEmpty(),
    // validateReq,
    logiCtrl
    );

module.exports = router;