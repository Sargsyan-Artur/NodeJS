import { Dialect, Options } from 'sequelize';

type TDBUser = {
    name: string,
    user: string,
    password: string,
}

export const dbUser: TDBUser = {
    name: "postgres",
    user: "postgres",
    password: "pass"
}

export const dbConfig: Options = {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
}
