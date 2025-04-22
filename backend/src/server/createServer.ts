import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import { HttpRequestLogger } from '../middlewares/HttpLogger';
import {appConfig} from '../utils/config';
import {ILogger} from '../utils/logger';

export const ROOT_PATH = `/api/${appConfig.API_VERSION ?? ''}`;

export default function (rootRouter: Router,logger:ILogger) {
    const nodeEnv = appConfig.MODE 
    if (nodeEnv !== 'production') {
        let envFileName = '.env';
        if (nodeEnv) {
            envFileName += `.${nodeEnv}`;
        }
    }

  
    //  Create Server
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const corsOrigin =
        appConfig.CORS_ORIGIN?.split(',')
            .map((origin) => origin.trim()) || [];
    if (nodeEnv !== 'production') {
        logger.info('cors allowed');
        app.use(cors({ origin: true, credentials: true }));
    } else {
        app.use(cors({ origin: corsOrigin }));
        logger.info(`cors allowed for ${corsOrigin}`);
    }
    app.use(cookieParser());
    app.use(HttpRequestLogger(logger));
    app.use(ROOT_PATH, rootRouter);
    const server = http.createServer(app);

    return server;
}