import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseTable } from "../common/BaseTable";
import { User } from "../User";
import { Quiz } from "../quiz/Quiz";


@Entity()
export class Assignment extends BaseTable {

    @Unique(["userId", "quizId"])

    @ManyToOne(type => User, user => user.assignments, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    @Column('int')
    userId: number;

    @ManyToOne(type => Quiz, quiz => quiz.assignments, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz;

    @Column('int')
    quizId: number;

}
