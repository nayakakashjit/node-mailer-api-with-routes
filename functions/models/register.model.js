const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: 'Your firstname is required',
            max: 25,
        },
        last_name: {
            type: String,
            required: 'Your lastname is required',
            max: 25,
        },
        email: {
            type: String,
            required: 'Your email is required',
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: 'Your password is required',
            select: false,
            max: 25,
        },
        role: {
            type: String,
            required: true,
            default: '0x01',
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;