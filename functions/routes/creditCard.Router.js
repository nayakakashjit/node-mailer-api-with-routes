const express = require("express");
const router = express.Router();
const verify = require('../middleware/verify');
const creditCardCtrl = require('../controllers/creditCard.Controller');


// Admin Routs
router.get('/users', verify, creditCardCtrl.getAllCreditCardList);
router.delete('/users/:id', verify, creditCardCtrl.deleteLoanList);

// web/portal routs
router.post('/send', creditCardCtrl.saveCreditCard);

module.exports = router;