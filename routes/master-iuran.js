var express = require('express');
const { verifyJwt } = require('../utils/encodings');
const { authorizeApi } = require('../utils/authorize-route');
const db = require('../database/models');
var router = express.Router();

router.get('/find', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const iuran = !!req.query.id
            ? await db.MasterIuran.findByPk(req.query.id)
            : await db.MasterIuran.findAll();
        httpResponseCode = 200;
        httpResponse = {
            success: true,
            iuran,
            metadata: {
                findUser,
            },
        };
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
    const { iuranName, requireCollector } = req.body;

    // Auth
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const userId = verifyJwt(token);
    const findUser = await db.User.findByPk(userId);

    let httpResponseCode;
    let httpResponse;

    if (findUser) {
        const addMasterIuran = await db.MasterIuran.create({
            iuranName,
            requireCollector,
            userId,
        });

        httpResponseCode = addMasterIuran ? 200 : 500;
        httpResponse = addMasterIuran
            ? {
                  success: true,
                  message: 'Master iuran added successfully',
                  metadata: {
                      iuranName,
                      requireCollector,
                      findUser,
                  },
              }
            : {
                  success: false,
                  message: 'Internal error',
              };
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
        const iuran = await db.MasterIuran.findByPk(req.query.id);
        const { iuranName, requireCollector } = req.body;

        await iuran.update({
            iuranName,
            requireCollector,
        });

        httpResponseCode = 200;
        httpResponse = iuran
            ? {
                  success: true,
                  message: 'Master iuran updated successfully',
                  metadata: {
                      iuranName,
                      requireCollector,
                      findUser,
                  },
              }
            : {
                  success: false,
                  message: 'Internal error',
              };
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
            const iuran = await db.MasterIuran.findByPk(id);
            await iuran.destroy();

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Iuran has been deleted successfully',
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
