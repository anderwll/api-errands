import express, { NextFunction, Request, Response } from 'express';
import { handleUsersDataBase } from '../../../database/users';
import { ResponseAPI } from '../../typeResponseAPI';
import { z, ZodError } from 'zod';

const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
    // MESSAGE ERROR
    const mesgRequiredError = 'Campo obrigátorio.';
    const msgFormatInvalid = 'Formato inválido.';
    const msgEmailInvalid = 'Utilize um e-mail válido.';
    const msgMinPassword = 'Senha deve conter no mínimo 6 caracteres.';
    const msgCharactersPassword = 'Senha deve conter no mínimo 1 letra e 1 número.';
    const msgMinName = 'Nome deve conter no mínimo 3 caracteres.';

    const userScheme = z.object({
        name: z
            .string({
                invalid_type_error: msgFormatInvalid,
                required_error: mesgRequiredError,
            })
            .min(3, { message: msgMinName }),
        email: z
            .string({
                invalid_type_error: msgFormatInvalid,
                required_error: mesgRequiredError,
            })
            .email({ message: msgEmailInvalid }),
        password: z
            .string({
                invalid_type_error: msgFormatInvalid,
                required_error: mesgRequiredError,
            })
            .min(6, { message: msgMinPassword })
            .regex(/^(?=.*[a-z])(?=.*[0-9])/, { message: msgCharactersPassword }),
    });

    try {
        const listUser = handleUsersDataBase();
        const { email } = req.body;

        const exist = listUser.some((user) => user.email === email);

        if (exist) {
            const response: ResponseAPI = {
                success: false,
                message: 'E-mail já cadastrado.',
                data: null,
            };

            return res.status(400).json(response);
        }

        const newBody = userScheme.parse(req.body);

        req.body = newBody;

        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            const responseError = error.issues.map((issue) => ({
                success: false,
                field: issue.path[0],
                message: issue.message,
                code: issue.code,
            }));

            return res.status(400).json(responseError);
        }
        throw error;
    }
};

export { createUserValidator };
