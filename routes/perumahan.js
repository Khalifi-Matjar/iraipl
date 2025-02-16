var express = require('express');
const { authorizeApi } = require('../utils/authorize-route');
const db = require('../database/models');
var router = express.Router();

router.get('/find', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const perumahan = await db.Perumahan.findAll({
                order: [['perumahan', 'ASC']],
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving perumahan data',
                perumahan,
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

module.exports = router;
