'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('tbl-user', 'kolektorId', {
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('tbl-user', 'kolektorId');
    },
};
