'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Kolektor extends Model {
        static associate(models) {
            this.hasOne(models.User, {
                foreignKey: 'kolektorId',
            });
        }
    }
    Kolektor.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            contact: DataTypes.STRING,
            email: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Kolektor',
            tableName: 'tbl-master-kolektor',
        }
    );
    return Kolektor;
};
