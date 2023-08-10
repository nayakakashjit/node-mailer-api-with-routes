const homeloanModel = require("../models/homeloan.model")
const mailCtrl = require('../controllers/mailController')


// Get Homeloans
const getAllHomeLoanList = async (req, res, next) => {
    try {
        const data = await homeloanModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            status: 200,
            message: 'successfully',
            data
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        })
    }
}

// Post Homeloans
const newHomeloan = async (req, res, next) => {
    const { name, email, phone, resident_type, company_name, property_state, property_city, selected_bank, via_wp } = req.body;
    try {
        const newLoan = new homeloanModel({
            name: name,
            email: email,
            phone: phone,
            resident_type: resident_type,
            company_name: company_name,
            property_state: property_state,
            property_city: property_city,
            selected_bank: selected_bank,
            via_wp: via_wp
        });
        await newLoan.save();
        newLoan.loantype = "home loan";
        mailCtrl.sendEmail(newLoan);
        res.status(200).send({
            status: 'success',
            message: 'success',
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
        });
    };
    res.end();
}

// Delete Homeloans
const deleteOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        await homeloanModel.findByIdAndDelete(id);
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
    }
}

module.exports = {
    getAllHomeLoanList,
    newHomeloan,
    deleteOne
}