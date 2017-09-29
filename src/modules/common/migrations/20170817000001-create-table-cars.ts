'use strict';

import { sequelize } from '../config/dataBase';

export async function up () {
    // language=PostgreSQL
    sequelize.query(`
        CREATE TABLE "cars" (
            "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
            "userId" INTEGER REFERENCES users (id) NOT NULL,
            "brandName" VARCHAR(30) NOT NULL,
            "purchaseDate" TIMESTAMP NOT NULL,
            "createdAt" TIMESTAMP NOT NULL,
            "updatedAt" TIMESTAMP NOT NULL,
            "deletedAt" TIMESTAMP
        );
    `);

    console.log('*Table cars created!*');
}

export async function down () {
    // language=PostgreSQL
    sequelize.query(`DROP TABLE cars`);
}
