'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tbl-master-perumahan', null, {});
        await queryInterface.bulkInsert('tbl-master-perumahan', [
            {
                id: uuidv4(),
                perumahan: 'Taman Setia Budi Indah 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                perumahan: 'Taman Setia Budi Indah 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tbl-master-perumahan', null, {});
    },
};
