import { NextFunction, Request, RequestHandler, Response } from 'express';
import  {ILogger}  from '../utils/logger';

export function HttpRequestLogger(logger: ILogger): RequestHandler {
    return function httpRequestLogger(req: Request, res: Response, next: NextFunction) {
        const start = performance.now();
        res.on('finish', () => {
            const durationInMilliseconds = performance.now() - start;
            const logData = {
                method:  req.method,
                status: res.statusCode,
                responseTime: `${durationInMilliseconds.toFixed(2)}ms`,
                host: req.headers.host,
                userAgent: req.headers['user-agent'],
                ip: req.ip,
            };

            if (res.statusCode >= 500) {
                logger.error('HTTP Request/Response Error', logData);
            } else if (res.statusCode >= 400) {
                logger.warning('HTTP Request/Response Warning', logData);
            } else {
                logger.info('HTTP Request/Response', logData);
            }
        });

        next();
    };
}