import { Request, Response } from "express";
import { User } from "../entities/User";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        await user.save();

        return res.json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: errorMessage });
    }
}


export const getUsers = async (req: Request, res: Response) => {
    try {

        const userId = parseInt(req.params.id);

        if (!userId) {
            const filteredUsers = await User.findBy(req.query);
            return res.json(filteredUsers);
        }

        const singleUser = await User.findOneBy({ id: userId });
        return res.json(singleUser);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: errorMessage });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        const result = await User.update({ id: userId },
            {
                ...req.body,
                updatedAt: new Date().toLocaleString('en', { timeZone: 'America/La_Paz' })
            });

        if (!result.affected) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = await User.findOneBy({ id: userId });
        return res.json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: errorMessage });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        const result = await User.delete({ id: userId });

        if (!result.affected) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.sendStatus(204);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ message: errorMessage });
    }

}
