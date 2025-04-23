import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ajv } from '../utils/validator/aj-validator';
import { DefinedError } from 'ajv';
import { ResponseType } from '../utils/types';

export function validateRequest(schemaName: string,type: 'body' | 'query' | 'params'  ) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.getSchema(schemaName);

        if (!validate) {
            throw createError(500, `Unknown validator schema: ${schemaName}`);
        }
        const isValid = validate(req[type]);
        if (isValid) {
            return next();
        }

        const __errors = (validate.errors  as DefinedError[] || []).map((err: DefinedError ) => {
            err =err as DefinedError
            return {
                field: err.instancePath || err.schemaPath,
                message: err.message,
                keyword: err.keyword,
                params: err.params,
            };
        });
    
        const fallback:ResponseType<{}>={
            details: __errors,
            message:`Bad request ${type}` ,
            data:null
        }
        res.status(400).json(fallback)
    
          
    };

}
