const functions = require("firebase-functions");
require('./dbConfig/mongoose')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const homeLoanRout = require('./routes/home-loan');
const personalLoanRout = require('./routes/personal-loan');
const businessLaonRout = require('./routes/business-loan');
const instaLoanRouts = require('./routes/insta-loan');
const creditCardRouts = require('./routes/credit-card');
const checkEligibilityRouts = require('./routes/checkEligibility');

app.use(bodyParser.json());
app.use('/homeloan', homeLoanRout);
app.use('/personal', personalLoanRout);
app.use('/business', businessLaonRout);
app.use('/insta', instaLoanRouts);
app.use('/creditCard', creditCardRouts);
app.use('/checkEligibility', checkEligibilityRouts);


app.listen(3000, () => {
  console.log("server run!!!");
});

// exports.app = functions.https.onRequest(app)

// mongodb+srv://umaloan:umaloan1a2b3c@cluster0.ududwug.mongodb.net/