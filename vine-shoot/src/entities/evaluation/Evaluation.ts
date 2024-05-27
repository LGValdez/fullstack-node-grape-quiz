import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { BaseTable } from "../common/BaseTable";
import { Quiz } from "../quiz/Quiz";
import { User } from "../User";
import { Question } from "../quiz/question/Question";
import { Option } from "../quiz/question/option/Option";

export enum EvaluationStatus {
    DRAFT = "draft",
    IN_PROGRESS = "inProgress",
    APPROVED = "approved",
    FAILED = "failed"
}

enum EvaluationMode {
    POP_QUIZ = "popQuiz",
    FORM = "form"
}


@Entity()
export class Evaluation extends BaseTable {

    @ManyToOne(type => User, user => user.evaluations, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    @Column('int')
    userId: number;

    @ManyToOne(type => Quiz, quiz => quiz.evaluations, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz;

    @Column('int')
    quizId: number;

    @ManyToMany(type => Question)
    @JoinTable()
    questions: Question[];

    @ManyToMany(type => Option)
    @JoinTable()
    options: Option[];

    @Column({
        type: "enum",
        enum: EvaluationStatus,
        default: EvaluationStatus.DRAFT,
        nullable: false
    })
    status: EvaluationStatus;

    @Column({
        type: "enum",
        enum: EvaluationMode,
        default: EvaluationMode.FORM,
        nullable: false
    })
    mode: EvaluationStatus;

    @Column('float', { default: 0 })
    finalScore: number;

}
