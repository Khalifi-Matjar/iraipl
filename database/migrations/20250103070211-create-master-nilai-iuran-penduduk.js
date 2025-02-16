'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl-master-nilai-iuran-penduduk', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            startDate: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            amount: {
                allowNull: false,
                type: Sequelize.DOUBLE,
            },
            iuranId: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-master-iuran',
                        name: 'MasterIuran',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            pendudukId: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-master-penduduk',
                        name: 'Penduduk',
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
        await queryInterface.dropTable('tbl-master-nilai-iuran-penduduk');
    },
};
