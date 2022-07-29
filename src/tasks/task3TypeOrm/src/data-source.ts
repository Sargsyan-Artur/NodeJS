import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass",
    database: "postgres",
    synchronize: true,
    logging: false,
    // entities: [User],
    // migrations: [],
    subscribers: [],
    // migrationsTableName: "custom_migration_table",
    entities: ["dist/entity/*.ts"],
    // migrationsTableName: "custom_migration_table",
    migrations: ["dist/migration/*.ts"],
})
