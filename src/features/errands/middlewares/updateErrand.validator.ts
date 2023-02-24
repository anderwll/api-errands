import express, { NextFunction, Request, Response } from 'express';
import { TypeAccount } from '../../../models';
import { z, ZodError } from 'zod';

const updateErrandValidator = (req: Request, res: Response, next: NextFunction) => {
    // MESSAGE ERROR
    const mesgRequiredError = 'Campo obrigátorio.';
    const msgFormatInvalid = 'Formato inválido.';
    const msgMin = 'Deve conter no mínimo 3 caracteres.';

    const errandScheme = z
        .object({
            title: z
                .string({
                    invalid_type_error: msgFormatInvalid,
                    required_error: mesgRequiredError,
                })
                .min(3, { message: msgMin }),
            description: z
                .string({
                    invalid_type_error: msgFormatInvalid,
                    required_error: mesgRequiredError,
                })
                .min(3, { message: msgMin }),
            filed: z.boolean({
                invalid_type_error: msgFormatInvalid,
                required_error: mesgRequiredError,
            }),
            check: z.boolean({
                invalid_type_error: msgFormatInvalid,
                required_error: mesgRequiredError,
            }),
        })
        .partial();

    try {
        const newBody = errandScheme.parse(req.body);

        req.body = newBody;

        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            const responseError = error.issues.map((issue: any) => ({
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

export { updateErrandValidator };
