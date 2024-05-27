import { Request, Response } from "express";

type ControllerExecution = (
    req: Request,
    res: Response
) => any;


export const apiWithHandleError = async (req: Request, res: Response, execution: ControllerExecution) => {
    try {
        return await execution(req, res);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: errorMessage });
    }
}
