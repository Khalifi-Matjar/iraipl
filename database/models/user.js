'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.RoleUser, {
                foreignKey: 'roleUserId',
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleUserId: DataTypes.INTEGER,
            kolektorId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'tbl-user',
        }
    );
    return User;
};
