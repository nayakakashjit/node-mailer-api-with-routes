const jwt = require('jsonwebtoken');
const config = require('../config')

const verifyToken = function (req, res, next) {
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
        return res.send({ status: 403, message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_ACCESS_TOKEN);
        req.user = decoded;
    } catch (error) {
        return res.send({ status: 401, message: 'Invalid Token' });
    }
    return next();
}

module.exports = verifyToken;