const crypto = require('crypto');
console.log('--------------->>>SECRET_ACCESS_TOKEN Called');
module.exports = {
    'SECRET_ACCESS_TOKEN': crypto.randomBytes(48).toString('base64url')
}