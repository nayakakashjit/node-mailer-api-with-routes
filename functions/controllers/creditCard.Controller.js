const creditCardModel = require('../models/creditCard.model');
const mailCtrl = require('../controllers/mailController');

const getAllCreditCardList = async (req, res, next) => {
    try {
        const data = await creditCardModel.find({});
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

const saveCreditCard = async (req, res, next) => {
    const { name, email, phone, property_state, property_city, employment_type, gender, pan, ext_cc, ext_cc_bank, maxLimit, company_name, selected_bank } = req.body;
    try {
        const newCard = new creditCardModel({
            name: name,
            email: email,
            phone: phone,
            property_state: property_state,
            property_city: property_city,
            employment_type: employment_type,
            gender: gender,
            pan: pan,
            ext_cc: ext_cc,
            ext_cc_bank: ext_cc_bank,
            maxLimit: maxLimit,
            company_name: company_name,
            selected_bank: selected_bank,
        });
    
        await newCard.save();
        newCard.loantype = "credit card";
        mailCtrl.sendEmail(newCard);
        res.status(200).json({
            status: 'success',
            message: 'success',
        });
    } catch (error) {
        console.log(error);
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
        await creditCardModel.findByIdAndDelete(id);
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
    getAllCreditCardList,
    saveCreditCard,
    deleteLoanList
}