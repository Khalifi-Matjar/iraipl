'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RoleUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RoleUser.hasMany(models.User, {
                foreignKey: 'roleUserId',
            });
        }
    }
    RoleUser.init(
        {
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'RoleUser',
            tableName: 'tbl-role-user',
        }
    );
    return RoleUser;
};
