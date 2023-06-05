const express = require("express");
const router = express.Router();
const verify = require('../middleware/verify');
const instaLoanCtrl = require('../controllers/instaLoan.Controller');


// Admin Routs
router.get('/users', verify, instaLoanCtrl.getAllInstaLoanList);
router.delete('/users/:id', verify, instaLoanCtrl.deleteLoanList);

// web/portal routs
router.post('/send', instaLoanCtrl.saveInstaLoan);

module.exports = router;