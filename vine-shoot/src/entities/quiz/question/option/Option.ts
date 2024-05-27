import {
    Column,
    Entity,
    ManyToOne
} from "typeorm";
import { BaseTable } from "../../../common/BaseTable";
import { Question } from "../Question";


@Entity()
export class Option extends BaseTable {

    @Column('text', { nullable: false })
    description: string;

    @Column('boolean', { default: false, select: false })
    isCorrect: boolean;

    @ManyToOne(type => Question, question => question.options, { onDelete: "CASCADE" })
    question: Question;

}