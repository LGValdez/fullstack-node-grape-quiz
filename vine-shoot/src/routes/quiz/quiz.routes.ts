import { Router } from "express";
import { createQuiz, deleteQuiz, getQuiz, updateQuiz } from "../../controllers/quiz/quiz.controllers";

const quizRouter = Router();

quizRouter.post('/quizes', createQuiz);

quizRouter.get('/quizes', getQuiz);

quizRouter.get('/quizes/:id', getQuiz);

quizRouter.put('/quizes/:id', updateQuiz);

quizRouter.delete('/quizes/:id', deleteQuiz);

export default quizRouter;
