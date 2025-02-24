'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl-penerimaan-iuran-validasi', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            validationDate: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            penerimaanId: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'tbl-penerimaan-iuran',
                        name: 'PenerimaanIuran',
                    },
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            validatedBy: {
                allowNull: false,
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
            validationStatus: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('tbl-penerimaan-iuran-validasi');
    },
};
