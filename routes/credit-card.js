var express = require('express');
// const res = require('express/lib/response');
var router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors())
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


router.use(bodyParser.json());


router.get('/', function(req, res) {
    res.send('Hello Credit Card Rout');
});


router.post('/send', cors(corsOptions), (req, res) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: 'akashjitnayak89@gmail.com', // must be Gmail
        pass: 'wswmmjoftflscoej'
      },
      });
  
    let maillist = [
      'nayakakashjit@gmail.com',
      'saha.santanu0217@gmail.com'
    ];
  
    let mailOptions = {
      from: 'akashjitnayak89@gmail.com',
      to: maillist, // must be Gmail
      cc:`${req.body.name} <${req.body.email}>`,
      subject: 'Sending Email using Node.js',
      html: `
              <table style="width: 100%; border: none">
                <thead>
                  <tr style="background-color: #000; color: #fff;">
                    <th style="padding: 10px 0">Name</th>
                    <th style="padding: 10px 0">E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style="text-align: center">${req.body.name}</th>
                    <td style="text-align: center">${req.body.email}</td>
                  </tr>
                </tbody>
              </table>
            `
    };
  
    let replyMailToUser = {
      from: 'akashjitnayak89@gmail.com',
      to: req.body.email,
      subject: `Thank you ${req.body.name}`,
    }
  
    console.log('replyMailToUser', replyMailToUser);
  
    transporter.sendMail(mailOptions, replyMailToUser, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'successfuly sent!'
        })
      }
    });
  
  });

  module.exports = router;