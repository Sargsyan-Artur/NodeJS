import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {accessTokenSecret} from "../constants/constants";

export const login = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log("err--=-=-=-=-=", err)
                return res.sendStatus(403);
            }
            console.log("user======isAuth ", user)
            res.locals.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
