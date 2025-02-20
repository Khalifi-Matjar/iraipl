var express = require('express');
const { hashText, signJwt } = require('../utils/encodings');
const db = require('../database/models');
const { authorizeApi } = require('../utils/authorize-route');
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
            metadata: {
                ...req.body,
            },
        });
    }
    res.end();
});

router.get('/get-user-details', async function (req, res, _next) {
    let httpResponseCode;
    let httpResponse;
    try {
        const findUser = await authorizeApi(req);
        if (!!findUser) {
            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving user details data',
                findUser,
            };
        } else {
            httpResponseCode = 401;
            httpResponse = {
                success: false,
                message: 'Unauthorized user',
            };
        }
    } catch (error) {
        if (error) {
            httpResponseCode = 500;
            httpResponse = {
                success: false,
                message: error.message,
                metadata: {
                    error,
                },
            };
        }
    }

    res.status(httpResponseCode);
    res.json(httpResponse);
    res.end();
});

module.exports = router;
