const express = require("express");
const router = express.Router();
const dashboardCtrl = require("../controllers/dashboaard.Controller")

router.get("/", dashboardCtrl.getAll);

module.exports = router;