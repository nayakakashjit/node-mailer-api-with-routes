const functions = require("firebase-functions");
require('./dbConfig/mongoose')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const homeLoanRout = require('./routes/homeLoan.Router');
const personalLoanRout = require('./routes/personalLoan.Router');
const businessLaonRout = require('./routes/businessLoan.Router');
const instaLoanRouts = require('./routes/instaLoan.Router');
const creditCardRouts = require('./routes/creditCard.Router');
const checkEligibilityRouts = require('./routes/checkEligibility.Router');
const registerRouts = require('./routes/register.Router');
const loginRouts = require('./routes/login.Router');
const logoutRouts = require('./routes/logout.Router')

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:4200", "http://localhost:4201"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use('/homeloan', cors(corsOptions), homeLoanRout);
app.use('/personal', personalLoanRout);
app.use('/business', businessLaonRout);
app.use('/insta', instaLoanRouts);
app.use('/creditCard', creditCardRouts);
app.use('/checkEligibility', checkEligibilityRouts);
app.use('/register', registerRouts);
app.use('/login', cors(corsOptions), loginRouts);
app.use('/logout', cors(corsOptions), logoutRouts);


app.listen(3000, () => {
  console.log("server run!!!");
});

// exports.app = functions.https.onRequest(app)

// mongodb+srv://umaloan:umaloan1a2b3c@cluster0.ududwug.mongodb.net/