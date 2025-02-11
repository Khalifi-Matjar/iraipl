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
            const id = req.query.id;
            const { address, pic, contact, email, isActive } = req.query;
            const penduduk = isUndefined(id)
                ? await db.Penduduk.findAll({
                      include: [
                          {
                              model: db.NilaiIuranPenduduk,
                              include: [
                                  {
                                      model: db.MasterIuran,
                                  },
                              ],
                          },
                      ],
                      where: {
                          [Op.and]: [
                              {
                                  address: { [Op.like]: `%${address ?? ''}%` },
                              },
                              {
                                  pic: { [Op.like]: `%${pic ?? ''}%` },
                              },
                              {
                                  contact: { [Op.like]: `%${contact ?? ''}%` },
                              },
                              {
                                  email: { [Op.like]: `%${email ?? ''}%` },
                              },
                              isActive && {
                                  isActive,
                              },
                          ],
                      },
                      order: [
                          ['address', 'ASC'],
                          ['pic', 'ASC'],
                      ],
                  })
                : await db.Penduduk.findByPk(id, {
                      include: [
                          {
                              model: db.NilaiIuranPenduduk,
                              include: [
                                  {
                                      model: db.MasterIuran,
                                  },
                              ],
                          },
                      ],
                      order: [[db.NilaiIuranPenduduk, 'startDate', 'DESC']],
                  });

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

router.post('/push-retribution', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        const id = req.query.id;
        const { startDate, amount, iuranId } = req.body;

        try {
            const penduduk = await db.Penduduk.findByPk(id);
            if (penduduk) {
                await db.NilaiIuranPenduduk.create({
                    startDate,
                    amount,
                    iuranId,
                    pendudukId: id,
                });

                httpResponseCode = 200;
                httpResponse = {
                    success: true,
                    message: 'Retribution has been pushed successfully',
                    metadata: {
                        findUser,
                        id,
                        body: req.body,
                    },
                };
            } else {
                httpResponseCode = 500;
                httpResponse = {
                    success: false,
                    message: `Could not found penduduk with id = ${id}`,
                    metadata: {
                        error,
                        id,
                        body: req.body,
                    },
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

router.delete('/delete-retribution', async function (req, res, _next) {
    const findUser = await authorizeApi(req);
    let httpResponseCode;
    let httpResponse;

    if (!!findUser) {
        try {
            const retributionId = req.query.id;
            const retribution =
                await db.NilaiIuranPenduduk.findByPk(retributionId);
            if (retribution) {
                await retribution.destroy();
                httpResponseCode = 200;
                httpResponse = {
                    success: true,
                    message: 'Nilai iuran has been deleted successfully',
                    metadata: {
                        retributionId,
                    },
                };
            } else {
                httpResponseCode = 500;
                httpResponse = {
                    success: false,
                    message: `Could not found nilai iuran with id = ${id}`,
                    metadata: {
                        retributionId,
                    },
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
