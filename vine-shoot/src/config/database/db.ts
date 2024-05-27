import { DataSource } from "typeorm";
import { dataSourceOptions } from "./dataSourceOptions";


export const AppDataSource = new DataSource({...dataSourceOptions})
