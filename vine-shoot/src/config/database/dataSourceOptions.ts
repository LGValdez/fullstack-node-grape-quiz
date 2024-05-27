import { User } from "../../entities/User";
import { Quiz } from "../../entities/quiz/Quiz";
import { Question } from "../../entities/quiz/question/Question";
import { Option } from "../../entities/quiz/question/option/Option";
import { Assignment } from "../../entities/assignment/Assignment";
import { Evaluation } from "../../entities/evaluation/Evaluation";
import { DataSourceOptions } from "typeorm";


export const dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [ User, Quiz, Question, Option, Assignment, Evaluation ],
    subscribers: [],
    migrations: [],
} as DataSourceOptions;
