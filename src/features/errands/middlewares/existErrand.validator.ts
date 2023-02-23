import express, { Request, Response, NextFunction } from 'express';
import { handleUsersDataBase } from '../../../database/users';
import { ResponseAPI } from '../../typeResponseAPI';
import { User } from '../../../models';

const existErrandValidator = (req: Request, res: Response, next: NextFunction) => {
    const listUser = handleUsersDataBase();
    const { id, idErrand } = req.params;

    const user = listUser.find((user) => user.id === id) as User;

    const errand = user.errands.some((errand) => errand.id === idErrand);

    if (!errand) {
        const response: ResponseAPI = {
            success: false,
            message: 'Recado não encontrado.',
            data: null,
        };

        return res.status(400).json(response);
    }

    return next();
};

export { existErrandValidator };
