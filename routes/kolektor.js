var express = require('express');
const isUndefined = require('lodash/isUndefined');
const isNull = require('lodash/isNull');
const db = require('../database/models');
const { authorizeApi } = require('../utils/authorize-route');
const { hashText } = require('../utils/encodings');
var router = express.Router();

router.get('/find', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const id = req.query.id;
            const kolektor = isUndefined(id)
                ? await db.Kolektor.findAll({ include: db.User })
                : await db.Kolektor.findByPk(id, { include: db.User });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving kolektor data',
                kolektor,
                metadata: {
                    id,
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

router.post('/add', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const { name, contact, email, address } = req.body;

        try {
            await db.Kolektor.create({
                name,
                contact,
                email,
                address,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Kolektor has been added successfully',
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

router.post('/update', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const id = req.query.id;
        const { name, contact, email, address } = req.body;

        try {
            const kolektor = await db.Kolektor.findByPk(id, {
                include: db.User,
            });
            await kolektor.update({
                name,
                contact,
                email,
                address,
            });

            // Update name and email in tbl-user as well as he has the data
            if (!isNull(kolektor.User)) {
                const user = await db.User.findByPk(kolektor.User.id);
                await user.update({
                    name,
                    email,
                });
            }

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Kolektor has been updated successfully',
                metadata: {
                    findUser,
                    id,
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
                        id,
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

router.delete('/delete', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const id = req.query.id;

        try {
            const kolektor = await db.Kolektor.findByPk(id);
            await kolektor.destroy();

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Kolektor has been deleted successfully',
                metadata: {
                    findUser,
                    id,
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
                        id,
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

router.post('/reset-password', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const id = req.query.id;
        const { password1 } = req.body;

        try {
            const kolektor = await db.Kolektor.findByPk(id, {
                include: db.User,
            });

            if (isNull(kolektor.User)) {
                // If he has no data in tbl-user, then create it
                await db.User.create({
                    name: kolektor.name,
                    email: kolektor.email,
                    password: hashText(password1),
                    roleUserId: 5,
                    kolektorId: kolektor.id,
                });
            } else {
                // Otherwise, just update the password with the newly given one
                const user = await db.User.findByPk(kolektor.User.id);
                await user.update({
                    password: hashText(password1),
                });
            }

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Password of kolektor has been reset successfully',
                metadata: {
                    findUser,
                    id,
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
                        id,
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
