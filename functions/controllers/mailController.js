const nodemailer = require("nodemailer");

exports.sendEmail = async function(newLoan, res){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
            user: "contact@umaloan.com", // must be Gmail
            pass: "mnbznqhsoxhxoujg",
        },
    });

    //   let maillist = ["contact@umaloan.com", "prafulkumar466@gmail.com"];
    let maillist = ["nayakakashjit@gmail.com"];

    let mailOptions = {
        from: "contact@umaloan.com",
        to: maillist, // must be Gmail
        subject: `New ${newLoan.loantype} enquiry`,
        html: `
            <h3>Hi</h3> </br>
            <h3>You have new ${newLoan.loantype} enquiry, Please check in Admin dashboard</h3> </br>
          </br>
          <h3>Thank You</h3>
                `,
    };

    let replyMailToUser = {
        from: "contact@umaloan.com",
        to: newLoan.email,
        subject: `Thank you ${newLoan.name}`,
        html: `
        <h3>Hi ${newLoan.name}</h3>
        <h3>Thank you, we have received your info</h3> 
        <h3>A customer service representative will be in touch within 24 hours</h3> 
    
        </br></br></br>
        <h3>Thank You</h3></br>
        <h3>UMALOAN FINANCIAL SERVICES.</h3>
        <img src="https://umaloan.com/assets/images/Logo/logo.jpg" alt="umaloanLogo" width="190" height="45">
        `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).json({
                message: "invalid request",
            });
        } else {
            console.log("Email sent: " + info.response);
            // reply(transporter);
            transporter.sendMail(replyMailToUser, (error, info) => {
                if (error) {
                    res.status(400).json({
                        message: "invalid request",
                    });
                } else {
                    console.log("Email sent to user: " + info.response);
                    res.status(200).json({
                        message: "successfuly sent!",
                    });
                    
                }
            });
            res.status(200).json({
                message: "successfuly sent!",
            });
        };
        res.end();
    });

    // function reply(transporter) {
    //     let replyMailToUser = {
    //         from: "contact@umaloan.com",
    //         to: req.body.email,
    //         subject: `Thank you ${req.body.name}`,
    //         html: `
    //         <h3>Hi ${req.body.name}</h3>
    //         <h3>Thank you, we have received your info</h3> 
    //         <h3>A customer service representative will be in touch within 24 hours</h3> 
        
    //         </br></br></br>
    //         <h3>Thank You</h3></br>
    //         <h3>UMALOAN FINANCIAL SERVICES.</h3>
    //         <img src="https://umaloan.com/assets/images/Logo/logo.jpg" alt="umaloanLogo" width="190" height="45">
    //         `,
    //     };
    //     transporter.sendMail(replyMailToUser, (error, info) => {
    //         if (error) {
    //             res.status(400).json({
    //                 message: "invalid request",
    //             });
    //         } else {
    //             console.log("Email sent to user: " + info.response);
    //             res.status(200).json({
    //                 message: "successfuly sent!",
    //             });
    //             res.end();
    //         }
    //     });
    // };
};