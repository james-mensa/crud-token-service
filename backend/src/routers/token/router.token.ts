import express from 'express';
import asyncHandler from 'express-async-handler';
import { validateRequest } from '../../middlewares/validateRequest';
import { TokenDocumentResponseId, TokenUniqueId } from '../../db/dto/token.dto';
import { TokenController } from '../../controller/token.controller';

const tokenRouter = express.Router();

const tokenController=new TokenController()



tokenRouter.post(
    '/token',
    validateRequest(TokenDocumentResponseId,'body'),
    asyncHandler(tokenController.add));

tokenRouter.get(
    '/token',
    asyncHandler(tokenController.getQuery));

tokenRouter.get(
    '/token/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.getByAddress)
);


tokenRouter.put(
    '/token/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.updateOne)
);

tokenRouter.delete(
    '/token/:address',
    validateRequest(TokenUniqueId,'params'),
    asyncHandler(tokenController.delete)
);

export default tokenRouter;