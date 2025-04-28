import express from 'express';
import asyncHandler from 'express-async-handler';
import { validateRequest } from '../../middlewares/validateRequest';
import { TokenDocumentResponseId, TokenUniqueId } from '../../db/dto/token.dto';
import { TokenController } from '../../controller/token.controller';

const tokenRouter = express.Router();

const tokenController=new TokenController()



tokenRouter.post(
    '/tokens',
    validateRequest(TokenDocumentResponseId,'body'),
    asyncHandler(tokenController.add));

tokenRouter.get(
    '/tokens',
    asyncHandler(tokenController.getQuery));

tokenRouter.get(
    '/tokens/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.getByAddress)
);


tokenRouter.put(
    '/tokens/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.updateOne)
);

tokenRouter.delete(
    '/tokens/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.delete)
);

export default tokenRouter;