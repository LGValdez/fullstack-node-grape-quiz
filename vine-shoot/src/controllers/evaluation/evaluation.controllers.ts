import { Request, Response } from "express";
import { Evaluation, EvaluationStatus } from "../../entities/evaluation/Evaluation";
import { apiWithHandleError } from "../common/handleError";
import { Quiz } from "../../entities/quiz/Quiz";
import { Option } from "../../entities/quiz/question/option/Option";
import { In } from "typeorm";


export const createEvaluation = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const { userId, quizId } = req.body;
    const evaluation = new Evaluation();

    evaluation.userId = userId;
    evaluation.quizId = quizId;

    await evaluation.save();

    return res.json(evaluation);
})


export const getEvaluation = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const evaluationId = parseInt(req.params.id);

    if (!evaluationId) {
        const filteredEvaluationes = await Evaluation.findBy(req.query);
        return res.json(filteredEvaluationes);
    }

    const singleEvaluation = await Evaluation.findOne({
        where: { id: evaluationId },
        relations: ['questions', 'questions.options', 'options'],
        loadEagerRelations: true,
    });
    if (!singleEvaluation) throw Error('Evaluation not found!');

    return res.json(singleEvaluation);
})


export const deleteEvaluation = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const evaluationId = parseInt(req.params.id);
    const evaluation = await Evaluation.delete({ id: evaluationId });

    if (!evaluation.affected) return res.status(404).json({ message: 'Evaluation not found' })

    return res.sendStatus(204);
})


export const beginEvaluation = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const evaluationId = parseInt(req.params.id);
    const evaluation = await Evaluation.findOneBy({ id: evaluationId });
    if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
    if (evaluation.status != EvaluationStatus.DRAFT) throw Error('Evaluation already in progress');

    const quiz = await Quiz.findOne({
        where: { id: evaluation.quizId },
        relations: ['questions'],
        loadEagerRelations: true,
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' })

    const shuffledQuestions = quiz.questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, quiz.poolSize);

    evaluation.questions = selectedQuestions;
    evaluation.status = EvaluationStatus.IN_PROGRESS;
    await evaluation.save();

    const singleEvaluation = await Evaluation.findOne({
        where: { id: evaluationId },
        relations: ['questions', 'options', 'questions.options'],
        loadEagerRelations: true,
    });
    return res.json(singleEvaluation);
})


export const completeEvaluation = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const evaluationId = parseInt(req.params.id);
    const evaluation = await Evaluation.findOne({
        where: { id: evaluationId },
        relations: ['questions', 'options', 'questions.options', 'quiz'],
        loadEagerRelations: true,
    });
    if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
    if (evaluation.status != EvaluationStatus.IN_PROGRESS) throw Error('Evaluation is not in progress');

    const { options } = req.body;
    if (!options) throw Error('No answers given');
    if (options.length != evaluation.questions.length) throw Error('Answers to some questions are missing');

    const fetchedOptions = await Option.find({
        where: { id: In([...options])},
        select: [ "isCorrect", "id", "description"]
    })
    evaluation.options = fetchedOptions;
    const correctlyAnswered = fetchedOptions.reduce((sum, option) => sum = sum + (option.isCorrect ? + 1 : 0), 0)
    const finalScore = 100 * (correctlyAnswered / evaluation.questions.length);
    const evaluationStatus = finalScore > evaluation.quiz.approveScore ? EvaluationStatus.APPROVED : EvaluationStatus.FAILED;

    evaluation.finalScore = finalScore;
    evaluation.status = evaluationStatus;
    await evaluation.save();

    const singleEvaluation = await Evaluation.findOne({
        where: { id: evaluationId },
        relations: ['questions', 'options', 'questions.options'],
        loadEagerRelations: true,
    });
    return res.json(singleEvaluation);
})
