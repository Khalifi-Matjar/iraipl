'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Penduduk extends Model {
        static associate(models) {
            this.hasMany(models.NilaiIuranPenduduk, {
                foreignKey: 'pendudukId',
            });

            this.belongsTo(models.Perumahan, {
                foreignKey: 'perumahanId',
            });
        }
    }
    Penduduk.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            address: DataTypes.STRING,
            perumahanId: DataTypes.STRING,
            pic: DataTypes.STRING,
            contact: DataTypes.STRING,
            email: DataTypes.STRING,
            isActive: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Penduduk',
            tableName: 'tbl-master-penduduk',
        }
    );
    return Penduduk;
};
