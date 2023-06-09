const businessLoanModel = require('../models/businessLoan.model');
const mailCtrl = require('../controllers/mailController');

const getAllBusinessLoanList = async (req, res, next) => {
    try {
        const data = await businessLoanModel.find({});
        res.status(200).send({
            status: 200,
            message: 'successfully',
            data
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        })
    };
    res.end();
}

const saveBusinessLoan = async (req, res, next) => {
    const { name, email, phone, property_state, property_city, emp_type, operation, turnover, current_ac, selected_bank, active_gst } = req.body;
    try {
        newLoan = new businessLoanModel({
            name: name,
            email: email,
            phone: phone,
            property_state: property_state,
            property_city: property_city,
            emp_type: emp_type,
            operation: operation,
            turnover: turnover,
            current_ac: current_ac,
            selected_bank: selected_bank,
            active_gst: active_gst
        });
        await newLoan.save();
        newLoan.loantype = "business loan";
        mailCtrl.sendEmail(newLoan);
        res.status(200).json({
            status: 'success',
            message: 'success',
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        })
    };
    res.end()
}

// delete 
const deleteLoanList = async (req, res, next) => {
    const id = req.params.id;
    try {
        await businessLoanModel.findByIdAndDelete(id);
        res.status(200).send({
            status: 'success',
            message: 'Record has been successfully deleted',
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        });
    };
    res.end();
};

module.exports = {
    getAllBusinessLoanList,
    saveBusinessLoan,
    deleteLoanList
}