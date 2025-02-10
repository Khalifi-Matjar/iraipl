'use strict';

var crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const password = crypto
            .createHash('sha256')
            .update('12345')
            .digest('hex');
        await queryInterface.bulkDelete(
            'tbl-user',
            { email: 'devadmin@app' },
            {}
        );
        await queryInterface.bulkInsert('tbl-user', [
            {
                name: 'development admin',
                email: 'devadmin@app',
                password,
                roleUserId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(
            'tbl-user',
            { email: 'devadmin@app' },
            {}
        );
    },
};
