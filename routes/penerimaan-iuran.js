var express = require('express');
const isUndefined = require('lodash/isUndefined');
const { authorizeApi } = require('../utils/authorize-route');
const db = require('../database/models');
const { Op } = require('sequelize');
var router = express.Router();

router.get('/find', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const { id, range, withKolektor, isMyCollective, isValidated } =
                req.query;
            const penerimaanIuran = await db.PenerimaanIuran.findAll({
                include: [
                    {
                        model: db.MasterIuran,
                    },
                    {
                        model: db.Kolektor,
                    },
                    {
                        model: db.PenerimaanIuranValidasi,
                    },
                    {
                        model: db.Penduduk,
                        include: [
                            {
                                model: db.Perumahan,
                            },
                        ],
                    },
                ],
                where: {
                    [Op.and]: [
                        id && {
                            id,
                        },
                        range && {
                            transactionDate: {
                                [Op.between]: (() => {
                                    const dateRange = JSON.parse(range);

                                    return [dateRange.from, dateRange.to];
                                })(),
                            },
                        },
                        withKolektor && {
                            kolektorId:
                                withKolektor.toLowerCase() === 'true'
                                    ? {
                                          [Op.not]: null,
                                      }
                                    : null,
                        },
                        isMyCollective?.toLowerCase() === 'true' && {
                            kolektorId: findUser.Kolektor.id,
                        },
                        isValidated && {
                            '$PenerimaanIuranValidasi.id$':
                                isValidated.toLowerCase() === 'true'
                                    ? {
                                          [Op.not]: null,
                                      }
                                    : null,
                        },
                    ],
                },
                order: [
                    ['transactionDate', 'ASC'],
                    [db.Penduduk, db.Perumahan, 'perumahan', 'ASC'],
                ],
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving penerimaan iuran data',
                penerimaanIuran,
                metadata: {
                    query: req.query,
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
    const isAddByKolektor = req.query.add_by_kolektor.toLowerCase() === 'true';
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const {
            transactionDate,
            amount,
            iuranId,
            pendudukId,
            kolektorId,
            periodMonth,
            periodYear,
            summary,
        } = req.body;

        try {
            await db.PenerimaanIuran.create({
                transactionDate,
                amount,
                iuranId,
                pendudukId,
                kolektorId: isAddByKolektor ? findUser.Kolektor.id : kolektorId,
                periodMonth,
                periodYear,
                summary,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penerimaan iuran has been added successfully',
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

router.delete('/delete', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const id = req.query.id;

        try {
            const penerimaanIuran = await db.PenerimaanIuran.findByPk(id);
            await penerimaanIuran.destroy();

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penerimaan iuran has been deleted successfully',
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

router.post('/validate', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const { penerimaanId, validationStatus, summary } = req.body;

        try {
            await db.PenerimaanIuranValidasi.create({
                validationDate: new Date(),
                penerimaanId,
                validatedBy: findUser.id,
                validationStatus,
                summary,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penerimaan iuran has been validated successfully',
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
