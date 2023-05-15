const bcrypt = require('bcrypt');
const userModel = require('../models/register.model');

module.exports = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    try {
        const hasPassword = bcrypt.hashSync(req.body.password, 8);
        // Check if user already exists
        const newUser = new userModel({
            first_name: first_name,
            last_name:last_name,
            email:email,
            password: hasPassword,
        });
        // Check if user already exists
        const existingUser = await userModel.findOne({email:email});
        if (existingUser) {
            return res.status(400).json({
                status: 'failed',
                data: [],
                message: 'It seems you already have an account, please log in instead.',
              });
        };
        // save new user into the database
        const savedUser = await newUser.save();
        const { password, role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: 'success',
            data: [user_data],
            message:
              'Thank you for registering with us. Your account has been successfully created.',
          });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            data: [],
            message: 'Internal Server Error',
          });
    }
    res.end();
}