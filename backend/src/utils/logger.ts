import Cluster from 'node:cluster';
import winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import {getEnvValue} from './config';

function prettyJ(json: object | string) {
    const jsonStr = typeof json === 'string' ? json : JSON.stringify(json);
    return jsonStr.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        (match: string) => {
            let cls = '\x1b[36m';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? '\x1b[34m' : '\x1b[32m';
            } else if (/true|false/.test(match)) {
                cls = '\x1b[35m';
            } else if (/null/.test(match)) {
                cls = '\x1b[31m';
            }
            return `${cls + match}\x1b[0m`;
        },
    );
}

export default class Logger{
    ctx:string=''
    opts:LoggerOpts={
        levels: {
            file: getEnvValue('LOG_LEVEL_FILE', 'debug'),
            console:getEnvValue('LOG_LEVEL_CONSOLE', 'debug'),
        },
    }
    constructor(ctxName:string,options?:LoggerOpts){
        this.ctx=ctxName;
        this.opts={...this.opts,...options}
    }
    get():winston.Logger{
        const LOG_CONSOLE_LEVEL = this.opts.levels?.console || 'debug';

        return winston.createLogger({
            levels: winston.config.syslog.levels,
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.align(),
                        winston.format.timestamp(),
                        winston.format.printf((info) => {
                            const { timestamp, level, message, ...args } = info;
                            const ts = (timestamp as string).replace('T', ' ');
                            return `${ts} [\x1b[36m${this.ctx}\x1b[0m] [${level}]: ${message} ${Object.keys(args).length ? `${prettyJ(args)}` : ''}`;
                        }),
                    ),
                    level: LOG_CONSOLE_LEVEL,
                })
            ],
        });
        
    }
}

interface LoggerOpts {
    levels?: {
        file?: string;
        console?: string;
    };
    logfilePath?: string;
    fileLogOpts?: winstonDailyRotateFile.DailyRotateFileTransportOptions;
}
export type ILogger=winston.Logger