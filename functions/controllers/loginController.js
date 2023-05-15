const bcrypt = require('bcrypt');
const userModel = require('../models/register.model');

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