'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MasterIuran extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    MasterIuran.init(
        {
            iuranName: DataTypes.STRING,
            requireCollector: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'MasterIuran',
            tableName: 'tbl-master-iuran',
        }
    );
    return MasterIuran;
};
