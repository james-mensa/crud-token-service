import express from 'express';
import tokenRouter from './token/router.token';

const rootRouter = express.Router();
rootRouter.use(tokenRouter)
export default rootRouter;