const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify');
const personalLoanCtrl = require('../controllers/personalLoanController');

// Admin routs
router.get('/users', verify, personalLoanCtrl.getAllPersonalList);
router.delete('/users/:id', verify, personalLoanCtrl.deleteLoanList);

// web/portal routs
router.post('/send', personalLoanCtrl.savePersonalLoan);

module.exports = router;