import { Router } from "express";
import { beginEvaluation, completeEvaluation, createEvaluation, deleteEvaluation, getEvaluation } from "../../controllers/evaluation/evaluation.controllers";

const evaluationRouter = Router();

evaluationRouter.post('/evaluations', createEvaluation);

evaluationRouter.get('/evaluations', getEvaluation);

evaluationRouter.get('/evaluations/:id', getEvaluation);

evaluationRouter.post('/evaluations/:id/begin', beginEvaluation);

evaluationRouter.post('/evaluations/:id/complete', completeEvaluation);

evaluationRouter.delete('/evaluations/:id', deleteEvaluation);

export default evaluationRouter;
