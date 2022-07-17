import {Sequelize, Dialect} from 'sequelize';
import {dbConfig, dbUser} from "../configs/db"

const sequelize = new Sequelize(
    dbUser.name,
    dbUser.user,
    dbUser.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

export async function auth() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
