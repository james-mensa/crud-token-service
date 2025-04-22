import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ajv } from '../utils/validator/aj-validator';

export function validateRequest(schemaName: string,type: 'body' | 'query' | 'params'  ) {
    return (req: Request, __: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schemaName);
        if (validate?.(req[type])) {
            next();
        } else if (!validate) {
            throw createError(500, `Unknown validator name:${schemaName}`);
        } else {
            throw createError(400, 'Bad request body', { errors: validate.errors });
        }
    };
}