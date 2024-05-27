import {
    Column,
    Entity,
    OneToMany,
} from "typeorm";
import { BaseTable } from "../common/BaseTable";
import { Assignment } from "../assignment/Assignment";
import { Question } from "./question/Question";
import { Evaluation } from "../evaluation/Evaluation";


@Entity()
export class Quiz extends BaseTable {

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    code: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('float', { nullable: false, default: 50.01 })
    approveScore: number;

    @Column('int', { nullable: false, default: 10 })
    poolSize: number;

    @Column('boolean', { default: true })
    active: boolean;

    @OneToMany(type => Question, question => question.quiz)
    questions: Question[];

    @OneToMany(type => Assignment, assignment => assignment.quiz)
    assignments: Assignment[];

    @OneToMany(type => Evaluation, evaluation => evaluation.quiz)
    evaluations: Assignment[];

}
