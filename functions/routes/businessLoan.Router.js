const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const businessLoanCtrl = require('../controllers/businessLoan.Controller');

// Admin routs
router.get('/users', verify, businessLoanCtrl.getAllBusinessLoanList);
router.delete('/users/:id',verify, businessLoanCtrl.deleteLoanList);

// web/portal routs
router.post('/send', businessLoanCtrl.saveBusinessLoan);

module.exports = router;