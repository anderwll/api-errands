import express, { Request, Response } from 'express';
import { handleUsersDataBase, saveUsersDataBase } from '../../../database/users';
import { User } from '../../../models';
import { ResponseAPI } from '../../typeResponseAPI';

class UserController {
    createUser(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();

            const { name, email, password, typeAccount } = req.body;

            const newUser = new User({ name, email, password, typeAccount });

            listUser.push(newUser);

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Usuário criado com sucesso.',
                data: newUser.handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(error);
        }
    }

    getUsers(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();

            const response: ResponseAPI = {
                success: true,
                message: 'Usuários buscado com sucesso.',
                data: listUser.map((user) => user.handleProperties()),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(error);
        }
    }

    getUserById(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id } = req.params;

            const user = listUser.find((user) => user.id === id);

            const response: ResponseAPI = {
                success: true,
                message: 'Usuário buscado com sucesso.',
                data: user,
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(error);
        }
    }

    updateUser(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();

            const { id } = req.params;
            const { name, password, darkMode, typeAccount } = req.body;

            const index = listUser.findIndex((user) => user.id === id);

            listUser[index].updateUser({ name, password, darkMode, typeAccount });

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Usuário atualizado com sucesso.',
                data: listUser[index].handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(error);
        }
    }

    deleteUser(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();

            const { id } = req.params;

            const index = listUser.findIndex((user) => user.id === id);

            const [userDeleted] = listUser.splice(index, 1);

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Usuário deletado com sucesso.',
                data: userDeleted.handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(error);
        }
    }
}

export { UserController };
