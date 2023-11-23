import { Request, Response } from 'express';
import express from 'express';
import userController from '../Controllers/userController';
import { createServerInvite } from '../discord/discord';

const UserController = new userController();

const apiRoutes = express.Router();

apiRoutes.get('/', async (req: Request, res: Response) => {
    const id = req.query.uid as string | undefined;
    if (!id) {
        res.status(400).send('ID is missing');
        return;
    }
    const response = await UserController.addInviteID(id);

    if (response === 'exist') res.status(400).send('ID already exist');
    else res.json({ url: response });

});

export default apiRoutes;