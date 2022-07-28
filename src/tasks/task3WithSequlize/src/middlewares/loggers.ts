import * as winston from "winston"
import { Request, Response } from 'express'

// const alignedWithColorsAndTime = winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp(),
//     winston.format.align(),
//     winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
// );

const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.label({
            label: `🏷️`
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};

export const logger = winston.createLogger(logConfiguration);

export const logService = (req: Request, res: any, next: any) => {
    console.log(req)

    console.log("body====", req.body)


    logger.info(`[Request Url] - ${req.protocol + "://" + req.get('host') + req.originalUrl}`)
    logger.info(`[Request Method] - ${req.method}`)
    logger.info(`[Request Body] - ${JSON.stringify(req.body)}`)
    logger.info(`[Request Params] - ${JSON.stringify(req.params)}`)
    logger.info(`[Request Query] - ${JSON.stringify(req.query)}`)
    return next()
}


export function timestamps(message: string) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function () {
            const startTime = new Date(Date.now());
            console.log(
                `${message} started at: ${startTime.toLocaleString("en-GB")}`
            );
            const result = await method.apply(target);
            const endTime = new Date(Date.now());
            console.log(
                `${message} completed at: ${endTime.toLocaleString("en-GB")}`
            );
            console.log(
                `${message} took ${
                    endTime.getTime() - startTime.getTime()
                }ms to complete.`
            );
            return result
        };
    };
}
