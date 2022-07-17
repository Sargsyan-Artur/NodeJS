import {Sequelize, Dialect} from 'sequelize';
import {dbConfig, dbUser} from "../configs/db"

export const dbConnector = new Sequelize(
    dbUser.name,
    dbUser.user,
    dbUser.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

(async function auth() {
    try {
        await dbConnector.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
