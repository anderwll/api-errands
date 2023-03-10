import express, { Request, Response } from 'express';
import { handleUsersDataBase, saveUsersDataBase } from '../../../database/users';
import { ResponseAPI } from '../../typeResponseAPI';
import { Errand, User } from '../../../models';

class ErrandController {
    createErrand(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id } = req.params;
            const { title, description } = req.body;

            const index = listUser.findIndex((user) => user.id === id);

            const newErrand = new Errand({ title, description });

            listUser[index].errands.push(newErrand);

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Recado criado com sucesso.',
                data: newErrand.handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(response);
        }
    }

    getErrands(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id } = req.params;
            const { title, filed } = req.query;

            const user = listUser.find((user) => user.id === id) as User;

            const errands = user.errands.filter((errand) => {
                if (title && filed) {
                    return (
                        errand.title.toLowerCase().includes((title as string).toLowerCase()) &&
                        errand.filed === Boolean(filed === 'true' ? true : false)
                    );
                }

                if (title) {
                    return errand.title.toLowerCase().includes((title as string).toLowerCase());
                }

                if (filed) {
                    return errand.filed === Boolean(filed === 'true' ? true : false);
                }

                return true;
            });

            const response: ResponseAPI = {
                success: true,
                message: `Recados buscado com sucesso.`,
                data: errands.map((errand) => errand.handleProperties()),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(response);
        }
    }

    getErrandById(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id, idErrand } = req.params;

            const user = listUser.find((user) => user.id === id) as User;

            const errand = user.errands.find((errand) => errand.id === idErrand) as Errand;

            const response: ResponseAPI = {
                success: true,
                message: 'Recado buscado com sucesso.',
                data: errand.handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(response);
        }
    }

    updateErrand(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id, idErrand } = req.params;
            const { title, description, filed, check } = req.body;

            const indexUser = listUser.findIndex((user) => user.id === id);

            const indexErrand = listUser[indexUser].errands.findIndex(
                (errand) => errand.id === idErrand,
            );

            listUser[indexUser].errands[indexErrand].updateErrand({
                title,
                description,
                filed,
                check,
            });

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Recado atualizado com sucesso.',
                data: listUser[indexUser].errands[indexErrand].handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(response);
        }
    }

    deleteErrand(req: Request, res: Response) {
        try {
            const listUser = handleUsersDataBase();
            const { id, idErrand } = req.params;

            const indexUser = listUser.findIndex((user) => user.id === id);

            const indexErrand = listUser[indexUser].errands.findIndex(
                (errand) => errand.id === idErrand,
            );

            const [errandDeleted] = listUser[indexUser].errands.splice(indexErrand, 1);

            saveUsersDataBase(listUser);

            const response: ResponseAPI = {
                success: true,
                message: 'Recado deletado com sucesso.',
                data: errandDeleted.handleProperties(),
            };

            return res.status(200).json(response);
        } catch (error: any) {
            const response: ResponseAPI = {
                success: false,
                message: error.message,
                data: null,
            };

            return res.status(400).json(response);
        }
    }
}

export { ErrandController };
