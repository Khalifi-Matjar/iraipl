var express = require('express');
var router = express.Router();
const db = require('../database/models');
const { Op } = require('sequelize');

/* GET home page. */
router.get('/rincian-penerimaan-iuran', async function (req, res, next) {
    const { from, to } = req.query;
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
            ],
        },
        order: [
            ['transactionDate', 'ASC'],
            [db.Penduduk, db.Perumahan, 'perumahan', 'ASC'],
        ],
    });

    res.render('report/penerimaan-iuran/rincian-penerimaan-iuran', {
        penerimaanIuran,
        from,
        to,
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

module.exports = router;
