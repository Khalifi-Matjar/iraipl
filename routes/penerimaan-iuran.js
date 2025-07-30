var express = require('express');
const isUndefined = require('lodash/isUndefined');
const { authorizeApi } = require('../utils/authorize-route');
const db = require('../database/models');
const { Op } = require('sequelize');
const moment = require('moment');
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
                    ['createdAt', 'ASC'],
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
            periodStart,
            periodEnd,
            paymentType,
            summary,
        } = req.body;

        try {
            const penerimaan = await db.PenerimaanIuran.create({
                transactionDate,
                amount,
                iuranId,
                pendudukId,
                kolektorId: isAddByKolektor ? findUser.Kolektor.id : kolektorId,
                periodStart,
                periodEnd,
                paymentType,
                summary,
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Penerimaan iuran has been added successfully',
                metadata: {
                    findUser,
                    body: req.body,
                    penerimaan,
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
            // Find how many penerimaan iuran exist in the PenerimaanIuranValidasi table
            const penerimaanIuranValidasi =
                await db.PenerimaanIuranValidasi.findAll({
                    where: {
                        penerimaanId: id,
                    },
                });

            console.log('penerimaanIuranValidasi', penerimaanIuranValidasi);

            if (penerimaanIuranValidasi.length <= 1) {
                const penerimaanIuran = await db.PenerimaanIuran.findByPk(id);
                await penerimaanIuran.destroy();
            } else {
                for (let i = 1; i < penerimaanIuranValidasi.length; i++) {
                    await penerimaanIuranValidasi[i].destroy();
                }
            }

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

router.get('/history', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const { pendudukId, iuranId } = req.query;
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
                        {
                            pendudukId,
                        },
                        {
                            iuranId,
                        },
                    ],
                },
                order: [
                    ['transactionDate', 'DESC'],
                    [db.Penduduk, db.Perumahan, 'perumahan', 'ASC'],
                    ['createdAt', 'DESC'],
                ],
            });

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving history penerimaan iuran data',
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

router.get('/auto-amount', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const { pendudukId, iuranId, periodStart, periodEnd } = req.query;

            const currentDate = moment(`${periodStart}-01`);
            const endDate = moment(`${periodEnd}-01`);

            let calculatedAmount = 0;
            const paidPeriod = [];
            do {
                const strCurrentDate = currentDate.format('YYYY-MM-DD');

                // Checking whether the current period has been paid or not
                const [paid] = await db.sequelize.query(
                    `
                    SELECT
                        * 
                    FROM
                        \`tbl-penerimaan-iuran\` 
                    WHERE
                        iuranId = $iuranId 
                        AND pendudukId = $pendudukId 
                        AND $date BETWEEN CONCAT( periodStart, '-01' ) 
                        AND LAST_DAY( CONCAT( periodEnd, '-01' ) )
                    `,
                    {
                        bind: {
                            pendudukId,
                            iuranId,
                            date: strCurrentDate,
                        },
                    }
                );

                if (paid.length > 0) {
                    paidPeriod.push(strCurrentDate);
                } else {
                    // Obatining the total amount that charged to penduduk based on the month range
                    const [amount] = await db.sequelize.query(
                        `
                    SELECT
                        amount
                    FROM
                        \`tbl-master-nilai-iuran-penduduk\` 
                    WHERE
                        pendudukId = $pendudukId 
                        AND iuranId = $iuranId
                        AND startDate <= LAST_DAY( $date ) 
                    ORDER BY
                        startDate DESC,
                        updatedAt DESC 
                        LIMIT 0,1
                `,
                        {
                            bind: {
                                pendudukId,
                                iuranId,
                                date: strCurrentDate,
                            },
                        }
                    );
                    calculatedAmount += amount[0]?.amount ?? 0;
                }

                currentDate.add(1, 'M');
            } while (currentDate <= endDate);

            httpResponseCode = 200;
            httpResponse = {
                success: true,
                message: 'Success retrieving auto amount data',
                amount: calculatedAmount,
                paidPeriod,
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

module.exports = router;
