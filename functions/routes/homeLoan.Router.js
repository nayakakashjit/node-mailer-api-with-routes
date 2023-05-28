var express = require("express");
var router = express.Router();
const verify = require('../middleware/verify');
const homeloanCtrl = require('../controllers/homeloanController')


router.get("/", verify, homeloanCtrl.getAllHomeLoanList);
router.post("/send", homeloanCtrl.newHomeloan);

module.exports = router;
