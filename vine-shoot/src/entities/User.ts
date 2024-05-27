import {
    Column,
    Entity,
    OneToMany,
} from "typeorm";
import { BaseTable } from "./common/BaseTable";
import { Assignment } from "./assignment/Assignment";
import { Evaluation } from "./evaluation/Evaluation";


@Entity()
export class User extends BaseTable {

    @Column('text', { nullable: false })
    firstName: string;

    @Column('text', { nullable: false })
    lastName: string;

    @Column('text', { nullable: false, unique: true })
    email: string;

    @Column('text', { nullable: false })
    password: string;

    @Column('boolean', { default: true })
    active: boolean;

    @OneToMany(type => Assignment, assignment => assignment.user)
    assignments: Assignment[];

    @OneToMany(type => Evaluation, evaluation => evaluation.quiz)
    evaluations: Assignment[];

}
