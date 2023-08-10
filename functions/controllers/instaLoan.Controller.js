const instaLoanModel = require('../models/instaLoan.model');
const mailCtrl = require('../controllers/mailController');

const getAllInstaLoanList = async (req, res, next) => {
    try {
        const data = await instaLoanModel.find({}).sort({createdAt: -1});
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
};

const saveInstaLoan = async (req, res, next) => {
    const { name, email, phone, amount, property_state, property_city, officialemail, company_name, pan, salary, selected_bank } = req.body;
    try {
        const newLoan = new instaLoanModel({
            name: name,
            email: email,
            phone: phone,
            amount: amount,
            property_state: property_state,
            property_city: property_city,
            officialemail: officialemail,
            company_name: company_name,
            pan: pan,
            salary: salary,
            selected_bank: selected_bank
        });
        await newLoan.save();
        newLoan.loantype = "Insta loan";
        mailCtrl.sendEmail(newLoan);
        res.status(200).json({
            status: 'success',
            message: 'success',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        });
    };
    res.end();

};

const deleteLoanList = async (req, res, next) => {
    const id = req.params.id;
    try {
        await instaLoanModel.findByIdAndDelete(id);
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
    getAllInstaLoanList,
    saveInstaLoan,
    deleteLoanList
}