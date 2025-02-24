const { verifyJwt } = require('./encodings');
const db = require('../database/models');

const authorizeApi = async (req) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const userId = verifyJwt(token);
    const findUser = await db.User.findByPk(userId, {
        include: [{ model: db.Kolektor }],
    });

    return findUser;
};

module.exports = {
    authorizeApi,
};
