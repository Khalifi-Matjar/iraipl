'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl-penerimaan-iuran', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            transactionDate: {
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
                allowNull: true,
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
            kolektorId: {
                allowNull: true,
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-master-kolektor',
                        name: 'Kolektor',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            periodStart: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            periodEnd: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            paymentType: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            summary: {
                allowNull: true,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('tbl-penerimaan-iuran');
    },
};
