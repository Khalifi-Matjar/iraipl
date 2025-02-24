'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkDelete('tbl-role-user', null, {});
        await queryInterface.sequelize.query(
            'ALTER TABLE `tbl-role-user` AUTO_INCREMENT = 1'
        );
        await queryInterface.bulkInsert('tbl-role-user', [
            {
                role: 'Admin Development',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role: 'Admin Aplikasi',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role: 'Admin Pengelolaan',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role: 'Bidang Pengelolaan',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { role: 'Collector', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('tbl-role-user', null, {});
        await queryInterface.sequelize.query(
            'ALTER TABLE `tbl-role-user` AUTO_INCREMENT = 1'
        );
    },
};
