const bcrypt = require('bcrypt');
const userModel = require('../models/register.model');
const jwt = require('jsonwebtoken');
const config  = require('../config')

module.exports = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email}).select('+password');
    if (!user)
    return res.status(401).json({
      status: 'failed',
      data: [],
      message: 'Account does not exist',
    });
    // if user exists
    // validate password
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password );

    // if not valid, return unathorized response
    if (!isPasswordValid)
    return res.status(401).json({
      status: 'failed',
      data: [],
      message:
        'Invalid email or password. Please try again with the correct credentials.',
    });
    
    let options = {
      maxAge: 20 * 60 * 1000, // expire in 20 minutes
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };

    const privatekey = config.SECRET_ACCESS_TOKEN;
    const token = jwt.sign({id: user.email}, privatekey);
    res.cookie('SessionID', token, options); // set the token to response header, so that the client sends it back on each subsequent reques

    // return user info except password
    const { password, ...user_data } = user._doc;
    res.status(200).json({
        status: 'success',
        data: [user_data],
        message: 'You have successfully logged in.',
      });
    } catch (error) {
    res.status(500).json({
        status: 'error',
        code: 500,
        data: [],
        message: 'Internal Server Error',
        });
    };
    res.end()
}

// HTTPonly ensures that a cookie is not accessible using the JavaScript code. This is the most crucial form of protection against cross-scripting attacks.
// A secure attribute ensures that the browser will reject cookies unless the connection happens over HTTPS.
// sameSite attribute improves cookie security and avoids privacy leaks.