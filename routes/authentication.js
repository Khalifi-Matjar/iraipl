var express = require('express');
const { hashText, signJwt } = require('../utils/encodings');
const db = require('../database/models');
const { authorizeApi } = require('../utils/authorize-route');
const { Op } = require('sequelize');
const isEmpty = require('lodash/isEmpty');
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

router.get('/get-users-non-kolektor', async function (req, res, _next) {
    let httpResponseCode;
    let httpResponse;
    try {
        const findUser = await authorizeApi(req);
        if (!!findUser) {
            const users = await db.User.findAll({
                where: {
                    roleUserId: { [Op.notIn]: [1, 5] },
                },
                include: db.RoleUser,
                order: [
                    ['name', 'ASC'],
                    ['email', 'ASC'],
                ],
            });
            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving user details data',
                users,
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

router.get('/get-user-details', async function (req, res, _next) {
    let httpResponseCode;
    let httpResponse;
    try {
        const findUser = await authorizeApi(req);
        const userId = req.query.id;
        if (!!findUser) {
            const userData = userId
                ? await db.User.findByPk(userId, {
                      include: [{ model: db.Kolektor }],
                  })
                : null;
            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving user details data',
                findUser,
                userData,
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

router.post('/add-user', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const { email, name, roleUserId, password } = req.body;

        try {
            await db.User.create({
                email,
                name,
                roleUserId,
                password: hashText(password),
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'User has been added successfully',
                metadata: {
                    findUser,
                    body: req.body,
                },
            };
        } catch (error) {
            if (error) {
                httpResponseCode = 500;
                httpResponse = {
                    success: false,
                    message: error.message,
                    metadata: {
                        error,
                        body: req.body,
                    },
                };
            }
        }
    } else {
        httpResponseCode = 401;
        httpResponse = {
            success: false,
            message: 'Unauthorized user',
        };
    }

    res.status(httpResponseCode);
    res.json(httpResponse);
    res.end();
});

router.post('/update-user', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const { email, name, roleUserId, password } = req.body;

        try {
            const userDetail = await db.User.findByPk(req.query.id);
            await userDetail.update({
                email,
                name,
                roleUserId,
                password: !isEmpty(password) ? hashText(password) : undefined,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'User has been updated successfully',
                metadata: {
                    findUser,
                    body: req.body,
                },
            };
        } catch (error) {
            if (error) {
                httpResponseCode = 500;
                httpResponse = {
                    success: false,
                    message: error.message,
                    metadata: {
                        error,
                        body: req.body,
                    },
                };
            }
        }
    } else {
        httpResponseCode = 401;
        httpResponse = {
            success: false,
            message: 'Unauthorized user',
        };
    }

    res.status(httpResponseCode);
    res.json(httpResponse);
    res.end();
});

module.exports = router;
