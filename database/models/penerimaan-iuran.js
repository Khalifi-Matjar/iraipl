'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PenerimaanIuran extends Model {
        static associate(models) {
            this.belongsTo(models.MasterIuran, {
                foreignKey: 'iuranId',
            });

            this.belongsTo(models.Kolektor, {
                foreignKey: 'kolektorId',
            });

            this.belongsTo(models.Penduduk, {
                foreignKey: 'pendudukId',
            });

            this.hasOne(models.PenerimaanIuranValidasi, {
                foreignKey: 'penerimaanId',
            });
        }
    }
    PenerimaanIuran.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            transactionDate: DataTypes.DATEONLY,
            amount: DataTypes.DOUBLE,
            iuranId: DataTypes.STRING,
            pendudukId: DataTypes.STRING,
            kolektorId: DataTypes.STRING,
            periodStart: DataTypes.STRING,
            periodEnd: DataTypes.STRING,
            paymentType: DataTypes.STRING,
            summary: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'PenerimaanIuran',
            tableName: 'tbl-penerimaan-iuran',
        }
    );
    return PenerimaanIuran;
};
