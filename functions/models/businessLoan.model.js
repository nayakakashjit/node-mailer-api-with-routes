const mongoose = require('mongoose');

const businessLoanSchema = mongoose.Schema(
    {
    name: {
        type: String
    },
    email: {
        type: String
    },
    property_state: {
        type: String
    },
    property_city: {
        type: String
    },
    phone: {
        type: Number
    },
    emp_type: {
        type: String
    },
    operation: {
        type: String
    },
    turnover: {
        type: String
    },
    current_ac: {
        type: String
    },
    selected_bank: {
        type: String
    },
    active_gst: {
        type: String
    }
},
{ timestamps: true },);

const businessLoanModel = mongoose.model('businessloan', businessLoanSchema);
module.exports = businessLoanModel;