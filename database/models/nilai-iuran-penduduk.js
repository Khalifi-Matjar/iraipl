'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NilaiIuranPenduduk extends Model {
        static associate(models) {
            this.belongsTo(models.MasterIuran, {
                foreignKey: 'iuranId',
            });

            this.belongsTo(models.Penduduk, {
                foreignKey: 'pendudukId',
            });
        }
    }
    NilaiIuranPenduduk.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            startDate: DataTypes.DATEONLY,
            amount: DataTypes.DOUBLE,
            iuranId: DataTypes.INTEGER,
            pendudukId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'NilaiIuranPenduduk',
            tableName: 'tbl-master-nilai-iuran-penduduk',
        }
    );
    return NilaiIuranPenduduk;
};
