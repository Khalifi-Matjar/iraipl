'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl-master-iuran', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            iuranName: {
                type: Sequelize.STRING,
            },
            requireCollector: {
                type: Sequelize.BOOLEAN,
            },
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-user',
                        name: 'User',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tbl-master-iuran');
    },
};
