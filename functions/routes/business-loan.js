var express = require('express');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter()
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
	res.send('Hello Personal Loan Rout');
});


router.post('/send', cors(corsOptions), (req, res) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		secure: true,
		port: 465,
		auth: {
			user: 'umaloan1@gmail.com', // must be Gmail
			pass: 'lnrmljoiswlczcmx'
		},
	});

	let maillist = [
    'prafulkumar466@gmail.com'
	];

	let mailOptions = {
		from: 'umaloan1@gmail.com',
		to: maillist, // must be Gmail
		// cc: `${req.body.name} <${req.body.email}>`,
		subject: 'New Business Loan Enquiry',
		html: `
		<h2>Hi</h2> </br>
    <h3>Please find the below details</h3> </br>
		<table style="width: 100%; border: none">
		<thead>
		  <tr style="background-color: #000; color: #fff;">
			<th style="padding: 10px 0">Full Name</th>
			<th style="padding: 10px 0">E-mail</th>
			<th style="padding: 10px 0">State</th>
			<th style="padding: 10px 0">City</th>
			<th style="padding: 10px 0">Phone</th>
			<th style="padding: 10px 0">Type Of Employment</th>
			<th style="padding: 10px 0">Number Of Years In Operation</th>
			<th style="padding: 10px 0">Business Turnover</th>
			<th style="padding: 10px 0">Current Account</th>
			<th style="padding: 10px 0">Selected Bank</th>
      <th style="padding: 10px 0">GST Active</th>
			</tr>
		</thead>
		<tbody>
		  <tr>
			<th style="text-align: center">${req.body.name}</th>
			<td style="text-align: center">${req.body.email}</td>
			<td style="text-align: center">${req.body.property_state}</td>
			<td style="text-align: center">${req.body.property_city}</td>
			<td style="text-align: center">${req.body.phone}</td>
			<td style="text-align: center">${req.body.emp_type}</td>
			<td style="text-align: center">${req.body.operation}</td>
			<td style="text-align: center">${req.body.turnover}</td>
			<td style="text-align: center">${req.body.current_ac}</td>
			<td style="text-align: center">${req.body.selected_bank}</td>
			<td style="text-align: center">${req.body.active_gst}</td>
		  </tr>
		</tbody>
	  </table>
    </br>
    <h3>Thank You</h3> 
    `
	};

	let replyMailToUser = {
		from: 'umaloan1@gmail.com',
		to: req.body.email,
		subject: `Thank you ${req.body.name}`,
    html: `
    <h4>Hi ${req.body.name}</h4>
    <h4>Thank you, we have received your info</h4> 
    <h4>A customer service representative will be in touch within 24 hours</h4> 

    </br></br></br>
    <h3>Thank You</h3>
    <h3>UMALOAN FINANCIAL SERVICES.</h3>
    `
	}


	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(400).json({
				message: 'invalid request'
			})
		} else {
			console.log('Email sent: ' + info.response);
			eventEmitter.emit('reply');
			res.status(200).json({
				message: 'successfuly sent!'
			})
		}
	});

eventEmitter.on('reply', function() {
	transporter.sendMail(replyMailToUser, (error, info) => {
		if (error) {
			console.log(error);
			res.status(400).json({
				message: 'invalid request'
			})
		} else {
			console.log('Email sent to user: ' + info.response);
			res.status(200).json({
				message: 'successfuly sent!'
			})
		}
	});
})

});

module.exports = router;