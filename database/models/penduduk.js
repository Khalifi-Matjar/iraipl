'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Penduduk extends Model {}
    Penduduk.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            address: DataTypes.STRING,
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
