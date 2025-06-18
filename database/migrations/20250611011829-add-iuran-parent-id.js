'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('tbl-master-iuran', 'iuranParentId', {
            type: Sequelize.STRING,
            after: 'userId',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('tbl-master-iuran', 'iuranParentId');
    },
};
