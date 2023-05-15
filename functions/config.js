const crypto = require('crypto');

module.exports = {
    'SECRET_ACCESS_TOKEN': crypto.randomBytes(48).toString('base64url')
}