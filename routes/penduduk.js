var express = require('express');
const isUndefined = require('lodash/isUndefined');
const { authorizeApi } = require('../utils/authorize-route');
const db = require('../database/models');
var router = express.Router();

router.get('/find', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const id = req.query.id;
            const penduduk = isUndefined(id) ? await db.Penduduk.findAll() : await db.Penduduk.findByPk(id);

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving penduduk data',
                penduduk,
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
        const { address, pic, contact, email, isActive } = req.body;

        try {
            await db.Penduduk.create({
                address,
                pic,
                contact,
                email,
                isActive,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penduduk has been added successfully',
                metadata: {
                    findUser,
                    body: { address, pic, contact, email, isActive },
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
                        body: { address, pic, contact, email, isActive },
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
        const { address, pic, contact, email, isActive } = req.body;

        try {
            const penduduk = await db.Penduduk.findByPk(id);
            await penduduk.update({
                address,
                pic,
                contact,
                email,
                isActive,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penduduk has been updated successfully',
                metadata: {
                    findUser,
                    id,
                    body: { address, pic, contact, email, isActive },
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
                        body: { address, pic, contact, email, isActive },
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
            const penduduk = await db.Penduduk.findByPk(id);
            await penduduk.destroy();

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penduduk has been deleted successfully',
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

module.exports = router;
