var express = require('express');
var router = express.Router();
const db = require('../database/models');
const { Op } = require('sequelize');

router.get('/rincian-penerimaan-iuran', async function (req, res, next) {
    const {
        from,
        to,
        paymentType: paymentTypeQuery,
        iuranId,
        kolektorId,
        reportType,
    } = req.query;
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
                    transactionDate: {
                        [Op.between]: [from, to],
                    },
                },
                {
                    '$PenerimaanIuranValidasi.id$': {
                        [Op.not]: null,
                    },
                },
                {
                    iuranId,
                },
                paymentTypeQuery.toLocaleLowerCase() !== 'undefined' && {
                    paymentType: paymentTypeQuery,
                },
                kolektorId.toLocaleLowerCase() !== 'undefined' && {
                    kolektorId,
                },
            ],
        },
        order: [
            ['transactionDate', 'ASC'],
            [db.Penduduk, db.Perumahan, 'perumahan', 'ASC'],
        ],
    });
    const masterIuran = await db.MasterIuran.findByPk(iuranId);
    const [payment] = ['Cash', 'Transfer'].filter(
        (type) => type === paymentTypeQuery
    );

    let reportView = '';
    switch (reportType) {
        case '1':
            reportView = 'report/penerimaan-iuran/rincian-penerimaan-iuran';
            break;

        case '2':
            reportView = 'report/penerimaan-iuran/rincian-penerimaan-retribusi';
            break;

        default:
            break;
    }

    res.render(reportView, {
        penerimaanIuran,
        from,
        to,
        iuranType: masterIuran.iuranName,
        payment: payment ?? '-',
        debug: JSON.stringify(penerimaanIuran),
    });
});

router.get('/rekap-penerimaan-kolektor', async function (req, res, next) {
    const { from, to } = req.query;
    const [rekapPenerimaanKolektor] = await db.sequelize.query(
        `SELECT
	a.id, a.\`name\`, COALESCE(b.amount, 0) AS amount
FROM
	\`tbl-master-kolektor\` a
	LEFT JOIN (
		SELECT
			ab.kolektorId,
			SUM(ab.amount) as amount 
		FROM
			\`tbl-penerimaan-iuran-validasi\` aa
			INNER JOIN \`tbl-penerimaan-iuran\` ab ON aa.penerimaanId = ab.id 
		WHERE
			ab.transactionDate BETWEEN $from AND $to
		GROUP BY
			ab.kolektorId
	) b ON a.id = b.kolektorId
    ORDER BY
	    a.name ASC`,
        {
            bind: {
                from,
                to,
            },
        }
    );

    res.render('report/penerimaan-iuran/rekap-penerimaan-kolektor', {
        rekapPenerimaanKolektor,
        from,
        to,
        debug: JSON.stringify(rekapPenerimaanKolektor),
    });
});

router.get('/receipt', async function (req, res, next) {
    const { id } = req.query;

    const penerimaanIuran = await db.PenerimaanIuran.findByPk(id, {
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
    });

    res.render('report/receipt/penerimaan-receipt', {
        penerimaanIuran,
    });
});

module.exports = router;
