  const express= require('express');
  const router = express.Router();
  const registerCtrl = require('../controllers/registerController')


  router.post('/', registerCtrl)

  module.exports = router;
