const mongoose = require('mongoose');

const creditCardSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    property_state: {
        type: String
    },
    property_city: {
        type: String
    },
    employment_type: {
        type: String
    },
    gender: {
        type: String
    },
    pan: {
        type: String
    },
    ext_cc: {
        type: String
    },
    selected_bank: {
        type: String
    },
    ext_cc_bank: {
        type: String
    },
    maxLimit: {
        type: Number
    },
    company_name: {
        type: String
    },
});

const creditCardModel = mongoose.model('creditcard', creditCardSchema);
module.exports = creditCardModel;