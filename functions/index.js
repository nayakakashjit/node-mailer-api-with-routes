const functions = require("firebase-functions");
require('./dbConfig/mongoose')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const homeLoanRout = require('./routes/home-loan');
const personalLoanRout = require('./routes/personal-loan');
const businessLaonRout = require('./routes/business-loan');
const instaLoanRouts = require('./routes/insta-loan');
const creditCardRouts = require('./routes/credit-card');
const checkEligibilityRouts = require('./routes/checkEligibility');
const registerRouts = require('./routes/registerRouter');
const loginRouts = require('./routes/loginRouter');

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:4200"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use('/homeloan', homeLoanRout);
app.use('/personal', personalLoanRout);
app.use('/business', businessLaonRout);
app.use('/insta', instaLoanRouts);
app.use('/creditCard', creditCardRouts);
app.use('/checkEligibility', checkEligibilityRouts);
app.use('/register', registerRouts);
app.use('/login', cors(corsOptions), loginRouts);


app.listen(3000, () => {
  console.log("server run!!!");
});

// exports.app = functions.https.onRequest(app)

// mongodb+srv://umaloan:umaloan1a2b3c@cluster0.ududwug.mongodb.net/