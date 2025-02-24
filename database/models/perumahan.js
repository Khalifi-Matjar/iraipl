'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Perumahan extends Model {}
    Perumahan.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            perumahan: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Perumahan',
            tableName: 'tbl-master-perumahan',
        }
    );
    return Perumahan;
};
