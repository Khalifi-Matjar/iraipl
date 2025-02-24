const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('@dotenvx/dotenvx').config();

const hashText = (text) =>
    crypto.createHash('sha256').update(text).digest('hex');

const signJwt = (text) => jwt.sign(text, process.env.JWT_SECRET_KEY);

const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
    hashText,
    signJwt,
    verifyJwt,
};
