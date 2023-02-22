import express, { Request, Response, NextFunction } from 'express';
import { handleUsersDataBase } from '../../../database/users';
import { ResponseAPI } from '../../typeResponseAPI';

const validationExistUser = (req: Request, res: Response, next: NextFunction) => {
    const listUser = handleUsersDataBase();
    const { id } = req.params;

    const exist = listUser.some((user) => user.id === id);

    if (!exist) {
        const response: ResponseAPI = {
            success: false,
            message: 'Usuário não encontrado.',
            data: null,
        };

        return res.status(400).json(response);
    }

    return next();
};

export { validationExistUser };
