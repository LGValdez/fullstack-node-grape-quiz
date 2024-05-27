import { Request, Response } from "express";
import { Quiz } from "../../entities/quiz/Quiz";
import { Question } from "../../entities/quiz/question/Question";
import { Option } from "../../entities/quiz/question/option/Option";
import { apiWithHandleError } from "../common/handleError";

type OptionData = { description: string, isCorrect: boolean };

type QuestionData = { description: string; options: OptionData[]; }


const createOption = async (optionData: OptionData) => {
    const { description, isCorrect } = optionData;
    const option = new Option();

    option.description = description;
    option.isCorrect = isCorrect ? isCorrect : false;

    await option.save();

    return option;
}


const createQuestion = async (questionData: QuestionData) => {
    const { description, options } = questionData;
    const question = new Question();

    question.description = description;
    if (options) question.options = await Promise.all(options.map(async (optionData: OptionData) => await createOption({
        description: optionData.description,
        isCorrect: optionData.isCorrect,
    })));

    await question.save();
    return question;
}


export const createQuiz = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const { name, code, description, approveScore, poolSize, questions } = req.body;
    const quiz = new Quiz();

    quiz.name = name
    quiz.code = code
    quiz.description = description
    quiz.approveScore = approveScore
    quiz.poolSize = poolSize

    if (questions) quiz.questions = await Promise.all(questions.map(async (questionData: QuestionData) => await createQuestion({
        description: questionData.description,
        options: questionData.options
    })));

    await quiz.save();

    return res.json(quiz);
})


export const getQuiz = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const quizId = parseInt(req.params.id);

    if (!quizId) {
        const filteredQuizes = await Quiz.findBy(req.query);
        return res.json(filteredQuizes);
    }

    const singleQuiz = await Quiz.findOne({
        where: { id: quizId },
        relations: ['questions', 'questions.options'],
        loadEagerRelations: true,
    });
    if (!singleQuiz) throw Error('Quiz not found!');

    return res.json(singleQuiz);
})


export const updateQuiz = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const quizId = parseInt(req.params.id);
    const result = await Quiz.update({ id: quizId },
        {
            ...req.body,
            updatedAt: new Date().toLocaleString('en', { timeZone: 'America/La_Paz' })
        });

    if (!result.affected) {
        return res.status(404).json({ message: 'Quiz not found' })
    }

    const user = await Quiz.findOneBy({ id: quizId });
    return res.json(user);
})


export const deleteQuiz = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const quizId = parseInt(req.params.id);
    const result = await Quiz.delete({ id: quizId });

    if (!result.affected) {
        return res.status(404).json({ message: 'Quiz not found' })
    }

    return res.sendStatus(204);
})
