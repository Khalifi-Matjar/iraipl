'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl-master-penduduk', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            perumahanId: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-master-perumahan',
                        name: 'Perumahan',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            pic: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            contact: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('tbl-master-penduduk');
    },
};
