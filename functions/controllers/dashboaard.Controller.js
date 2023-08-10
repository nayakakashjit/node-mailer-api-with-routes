const homeloanModel = require("../models/homeloan.model");
const personalLoanModel = require("../models/personalLoan.model");
const businessLoanModel = require("../models/businessLoan.model");
const instaLoanModel = require("../models/instaLoan.model");
const creditCardModel = require("../models/creditCard.model");

const getAll = async (req, res, next) => {
    const allPromise = Promise.all([
        homeloanModel.count().exec(),
        personalLoanModel.count().exec(),
        businessLoanModel.count().exec(),
        instaLoanModel.count().exec(),
        creditCardModel.count().exec(),
    ])
    try {
        const values = await allPromise;
        res.status(200).send({
            status: 200,
            message: 'successfully',
            values
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

module.exports = {
    getAll
}