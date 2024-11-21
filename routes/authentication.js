var express = require('express');
const { hashText, signJwt } = require('../utils/encodings');
const db = require('../database/models');
var router = express.Router();

/* GET home page. */
router.post('/login-attempt', async function (req, res, _next) {
    const { email, password } = req.body;
    const hashPassword = hashText(password);

    const user = await db.User.findAll({
        where: {
            email,
            password: hashPassword,
        },
        include: db.RoleUser,
    });

    if (user.length > 0) {
        res.status(200);
        res.json({
            success: true,
            token: signJwt(user[0].id),
            name: user[0].name,
            roleUser: { ...user[0].RoleUser.dataValues },
            metadata: {
                ...req.body,
            },
        });
    } else {
        res.status(401);
        res.json({
            success: false,
            message: 'email dan password tidak sama atau tidak ditemukan',
            metadata: {
                ...req.body,
            },
        });
    }
    res.end();
});

module.exports = router;
