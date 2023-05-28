const jwt = require('jsonwebtoken');
const config = require('../config')

const verifyToken = function (req, res, next) {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        try {
            const decoded = jwt.verify(token, config.SECRET_ACCESS_TOKEN);
            req.user = decoded;
        } catch (error) {
            return res.status(401).send({ status: 401, message: 'Invalid Token' });
        }
    } else {
        return res.status(403).send({ status: 403, message: 'A token is required for authentication' });
    }

    return next();
}

module.exports = verifyToken;