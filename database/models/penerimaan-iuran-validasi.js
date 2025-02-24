'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PenerimaanIuranValidasi extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'validatedBy',
            });
        }
    }
    PenerimaanIuranValidasi.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            validationDate: DataTypes.DATEONLY,
            penerimaanId: DataTypes.STRING,
            validatedBy: DataTypes.STRING,
            validationStatus: DataTypes.INTEGER,
            summary: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
        },
        {
            sequelize,
            modelName: 'PenerimaanIuranValidasi',
            tableName: 'tbl-penerimaan-iuran-validasi',
        }
    );
    return PenerimaanIuranValidasi;
};
