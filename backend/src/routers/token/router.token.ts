import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import httpStatus from 'http-status';
import _ from 'lodash';
import createHttpError from 'http-errors';
import { validateRequest } from '../../middlewares/validateRequest';
import { TokenDocumentResponseId } from '../../db/dto/token.dto';

const tokenRouter = express.Router();




tokenRouter.post(
    '/token',
    validateRequest(TokenDocumentResponseId,'body'),
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(httpStatus.OK).json({  });
    }),
);
tokenRouter.get(
    '/token',
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(httpStatus.OK).json({ msg:'okay' });
    }),
);

tokenRouter.get(
    '/token:id',
    validateRequest(TokenDocumentResponseId,'query'),
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(httpStatus.OK).json({  });
    }),
);


tokenRouter.put(
    '/token:id',
    validateRequest(TokenDocumentResponseId,'query'),
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(httpStatus.OK).json({  });
    }),
);

tokenRouter.delete(
    '/token:id',
    validateRequest(TokenDocumentResponseId,'query'),
    asyncHandler(async (req: Request, res: Response) => { 
        res.status(httpStatus.OK).json({  });
    }),
);

export default tokenRouter;