import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS, MESSAGE} from "../constants/constants"
import {TUser} from "../types/user.type"
import {UserService} from "../services/user.service";
import {userModel} from "../entity/user.model";
import {logger, timestamps} from "../middlewares/loggers";
import {accessTokenSecret} from "../constants/constants";
import jwt from 'jsonwebtoken';

const userService = new UserService(userModel)

export class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        const body: TUser = await req.body as TUser
        console.log("body===", req.body)
        const user = await userService.create(body).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> createUser(${JSON.stringify(body)}) \n[ERROR] - ${err.message}`)
        })

        if(user) {
            return res.setHeader("Content-Type", "application/json").status(HTTP_STATUS.SUCCESS).json(user)
        }
        return
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const user = await userService.get(id).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> getUser(${id}) \n${err.message}`)
        })

        if(user) {
            return res
                    .setHeader("Content-Type", "application/json")
                    .status(HTTP_STATUS.SUCCESS)
                    .json(user)
        }

        return res.status(HTTP_STATUS.NOT_FOUND)
            .send(MESSAGE.NOT_FOUND)
    }

    async searchUser(req: Request, res: Response, next: NextFunction) {
        const limit = Number(req.query.limit) || 1
        const substring = req.query.substring as string
        const users = await userService.search(limit, substring).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> searchUser(${limit}, ${substring}) \n${err.message}`)
        })

        if(users) {
            return res.status(HTTP_STATUS.SUCCESS).json(users)
        }

        res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        const updatedUser = await userService.update(req.params.id, req.body).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> updateUser(${req.params.id}, ${JSON.stringify(req.body)}) \n${err.message}`)
        })
        !updatedUser.error
            ? res.status(HTTP_STATUS.SUCCESS)
                .setHeader("Content-Type", "application/json")
                .json(updatedUser)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const response = await userService.delete(req.params.id).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> deleteUser(${req.params.id}) \n${err.message}`)
        })
        !response.error
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
            :
            res.status(HTTP_STATUS.NOT_FOUND)
                .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name
        const password = req.body.password
        const user = await userService.login(name, password).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> login(${name},${password}) \n${err.message}`)
        })
        console.log("user=============", user)
        if (user) {
            // Generate an access token
            const accessToken = jwt.sign({ username: user.name}, accessTokenSecret, { expiresIn: '20m' });

            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }
    //     user
    //         ? res.setHeader("Content-Type", "application/json")
    //             .status(HTTP_STATUS.SUCCESS)
    //             .json(user)
    //             .send(res.locals.user)
    //         : res.status(HTTP_STATUS.NOT_FOUND)
    //             .send(MESSAGE.NOT_FOUND)
    }
}

export default new UserController()

