import express, { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const createErrandValidator = (req: Request, res: Response, next: NextFunction) => {
    // MESSAGE ERROR
    const mesgRequiredError = 'Campo obrigátorio.';
    const msgFormatInvalid = 'Formato inválido.';
    const msgMin = 'Deve conter no mínimo 3 caracteres.';

    const errandScheme = z.object({
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
    });

    try {
        const newBody = errandScheme.parse(req.body);

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

export { createErrandValidator };
