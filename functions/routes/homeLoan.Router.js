const express = require("express");
const router = express.Router();
const verify = require('../middleware/verify');
const homeloanCtrl = require('../controllers/homeloanController')

// Admin routs
router.get("/users", verify, homeloanCtrl.getAllHomeLoanList);
router.delete("/users/:id", verify, homeloanCtrl.deleteOne);

// web/portal routs
router.post("/send", homeloanCtrl.newHomeloan);

module.exports = router;