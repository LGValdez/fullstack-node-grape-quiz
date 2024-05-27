import { Request, Response } from "express";
import { Assignment } from "../../entities/assignment/Assignment";
import { apiWithHandleError } from "../common/handleError";


export const createAssignment = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const { userId, quizId } = req.body;
    const assignment = new Assignment();

    assignment.userId = userId;
    assignment.quizId = quizId;

    await assignment.save();

    return res.json(assignment);
})


export const getAssignment = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const assignmentId = parseInt(req.params.id);

    if (!assignmentId) {
        const filteredAssignmentes = await Assignment.findBy(req.query);
        return res.json(filteredAssignmentes);
    }

    const singleAssignment = await Assignment.findOneBy({ id: assignmentId  });
    if (!singleAssignment) throw Error('Assignment not found!');

    return res.json(singleAssignment);
})


export const deleteAssignment = async (req: Request, res: Response) => apiWithHandleError(req, res, async () => {
    const assignmentId = parseInt(req.params.id);
    const result = await Assignment.delete({ id: assignmentId });

    if (!result.affected) {
        return res.status(404).json({ message: 'Assignment not found' })
    }

    return res.sendStatus(204);
})
