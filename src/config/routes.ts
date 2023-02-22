import express, { Application, Request, Response } from 'express';
import { userRoutes } from '../features/users/user.routes';
import { initialPage } from './initialPage';

const routesApp = (app: Application) => {
    const router = express.Router();

    app.use('/', router);
    router.get('/', (req: Request, res: Response) => res.status(200).send(initialPage));

    userRoutes(router);
};

export { routesApp };
