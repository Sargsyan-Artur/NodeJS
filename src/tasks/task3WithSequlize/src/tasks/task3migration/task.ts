import {login} from "../../middlewares/authorization";

interface Error {
    status?: number;
    code?: number;
}
export class CustomError extends Error {
    status = 400;

    constructor(status: number, message: string) {
        super(message);

        this.status = status;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
}
const err = new CustomError(205, 'Something went wrong');

import express from "express";
import bodyParser from "body-parser";
import {unless} from "express-unless";
import db from "../../models"
import userRoutes from "../../routers/user.routers"
import groupRoutes from "../../routers/group.routers"
import userGroupRouters from "../../routers/user.group.routers";
import {logger, logService} from "../../middlewares/loggers";
import cors from "cors"
import {errorHandler} from "../../middlewares/errorHandler";

export const app = express()



const corsOptions = {
    origin: ['https://www.section.io'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(bodyParser.json());




app.use(logService)


app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/usergroup', userGroupRouters);

app.use(errorHandler)

process.on('unhandledRejection',(error,promise)=>{
    logger.error('[Unhandled Rejection] - ', error, promise);
})

process.on('uncaughtException',(error,origin)=>{
    logger.error('[Uncaught Exception] - ', error, origin);
})

db.sequelize.sync().then(() => {
    logger.info("listneing")
    app.listen("3001")
})
