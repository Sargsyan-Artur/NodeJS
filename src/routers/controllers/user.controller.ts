import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS, MESSAGE} from "../../constants/constants"
import {TUser} from "../../tasks/task2/types/user.type"
import userService from "../../services/user.service"


export class UserController {
    createUser(req: Request, res: Response) {
        const body: TUser = req.body as TUser
        const user = userService.createUser(body)
        res.setHeader("Content-Type", "application/json").status(HTTP_STATUS.SUCCESS).json(user)
    }

    getUser(req: Request, res: Response) {
        const user = userService.getUser(req)
        user
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .json(user)
                .send(res.locals.user)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    searchUser(req: Request, res: Response) {
        const users = userService.searchUsers(req)
        users
            ? res.status(HTTP_STATUS.SUCCESS).json(users)
            : res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
    }

    updateUser(req: Request, res: Response) {
        const updatedUser = userService.updateUser(req)
        updatedUser
            ? res.status(HTTP_STATUS.SUCCESS)
                .setHeader("Content-Type", "application/json")
                .json(updatedUser)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    deleteUser(req: Request, res: Response) {
        userService.deleteUser(req)
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
    }
}

export default new UserController()

