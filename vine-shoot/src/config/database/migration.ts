import { DataSource } from "typeorm";
import { dataSourceOptions } from "./dataSourceOptions";


export const migrationDataSource = new DataSource({
    ...dataSourceOptions,
    migrations: ["./src/migrations/**/*.ts"],
})
