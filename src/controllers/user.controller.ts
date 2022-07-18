import {Request, Response} from "express";
import {HTTP_STATUS, MESSAGE} from "../constants/constants"
import {TUser} from "../types/user.type"
import {UserService} from "../services/user.service";
import userModel from "../entity/user.model";

const userService = new UserService(userModel)

class UserController {

    async createUser(req: Request, res: Response) {
        const body: TUser = await req.body as TUser
        const user = await userService.createUser(body)
        res
            .setHeader("Content-Type", "application/json")
            .status(HTTP_STATUS.SUCCESS).json(user)
    }

    async getUser(req: Request, res: Response) {
        const id = req.params.id
        const user = await userService.getUser(id)
        user
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .json(user)
                .send(res.locals.user)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    async searchUser(req: Request, res: Response) {
        const limit = Number(req.query.limit) || 1
        const substring = req.query.substring as string
        const users = await userService.searchUsers(limit, substring)

        users
            ? res.status(HTTP_STATUS.SUCCESS).json(users)
            : res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
    }

    async updateUser(req: Request, res: Response) {
        const updatedUser = await userService.updateUser(req.params.id, req.body)
        updatedUser.error
            ? res.status(HTTP_STATUS.SUCCESS)
                .setHeader("Content-Type", "application/json")
                .json(updatedUser)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    async deleteUser(req: Request, res: Response) {
        const response = await userService.deleteUser(req.params.id)
        response.error
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
            :
            res.status(HTTP_STATUS.NOT_FOUND)
                .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
    }
}

export default new UserController()

