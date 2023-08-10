const mongoose = require('mongoose');

const homeloanSchema = mongoose.Schema(
    {
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    resident_type: {
        type: String
    },
    company_name: {
        type: String
    },
    property_state: {
        type: String
    },
    property_city: {
        type: String
    },
    selected_bank: {
        type: String
    },
    via_wp: {
        type: String
    },
},
{ timestamps: true },
);

const homeloanModel = mongoose.model('homeloan', homeloanSchema);
module.exports = homeloanModel;