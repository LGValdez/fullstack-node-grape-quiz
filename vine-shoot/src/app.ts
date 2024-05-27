import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz/quiz.routes';
import assignmentRoutes from './routes/assignment/assigment.routes';
import evaluationRoutes from './routes/evaluation/evaluation.routes';


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/health", (req: Request, res:Response) => {
    res.status(200).json({message: 'Server is running properly'})
})

app.use(userRoutes);
app.use(quizRoutes);
app.use(assignmentRoutes);
app.use(evaluationRoutes);


export default app;
