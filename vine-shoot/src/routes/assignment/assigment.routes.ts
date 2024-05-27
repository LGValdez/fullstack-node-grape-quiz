import { Router } from "express";
import { createAssignment, deleteAssignment, getAssignment } from "../../controllers/assignment/assignment.controller";


const assignmentRouter = Router();

assignmentRouter.post('/assignments', createAssignment);

assignmentRouter.get('/assignments', getAssignment);

assignmentRouter.get('/assignments/:id', getAssignment);

assignmentRouter.delete('/assignments/:id', deleteAssignment);

export default assignmentRouter;
