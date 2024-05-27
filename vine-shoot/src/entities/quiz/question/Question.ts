import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { BaseTable } from "../../common/BaseTable";
import { Quiz } from "../Quiz";
import { Option } from "./option/Option";


@Entity()
export class Question extends BaseTable {

    @Column('text', { nullable: false })
    description: string;

    @ManyToOne(type => Quiz, quiz => quiz.questions, { onDelete: "CASCADE" })
    quiz: Quiz;

    @OneToMany(type => Option, option => option.question)
    options: Option[];

}