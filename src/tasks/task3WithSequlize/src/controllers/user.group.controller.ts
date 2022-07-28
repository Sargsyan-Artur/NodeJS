import {Request, Response} from "express";
import {HTTP_STATUS, MESSAGE} from "../constants/constants"
import {TUser} from "../types/user.type"
import {UserGroupService} from "../services/user.group.service";
import {userGroupModel} from "../entity/user.group.model";

const userGroupService = new UserGroupService(userGroupModel)

class UserGroupController {

    async addUsersToGroup(req: Request, res: Response) {
        const userId: string = await req.body.userId
        const groupId: string = await req.body.groupId
        const user = await userGroupService.addUsersToGroup(userId, groupId)

        res.setHeader("Content-Type", "application/json").status(HTTP_STATUS.SUCCESS).json(user)
    }

    // async getUser(req: Request, res: Response) {
    //     const id = req.params.id
    //     const user = await userService.get(id)
    //     user
    //         ? res.setHeader("Content-Type", "application/json")
    //             .status(HTTP_STATUS.SUCCESS)
    //             .json(user)
    //             .send(res.locals.user)
    //         : res.status(HTTP_STATUS.NOT_FOUND)
    //             .send(MESSAGE.NOT_FOUND)
    // }
    //
    // async searchUser(req: Request, res: Response) {
    //     const limit = Number(req.query.limit) || 1
    //     const substring = req.query.substring as string
    //     const users = await userService.search(limit, substring)
    //
    //     users
    //         ? res.status(HTTP_STATUS.SUCCESS).json(users)
    //         : res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
    // }
    //
    // async updateUser(req: Request, res: Response) {
    //     const updatedUser = await userService.update(req.params.id, req.body)
    //     !updatedUser.error
    //         ? res.status(HTTP_STATUS.SUCCESS)
    //             .setHeader("Content-Type", "application/json")
    //             .json(updatedUser)
    //         : res.status(HTTP_STATUS.NOT_FOUND)
    //             .send(MESSAGE.NOT_FOUND)
    // }
    //
    // async deleteUser(req: Request, res: Response) {
    //     const response = await userService.delete(req.params.id)
    //     !response.error
    //         ? res.setHeader("Content-Type", "application/json")
    //             .status(HTTP_STATUS.SUCCESS)
    //             .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
    //         :
    //         res.status(HTTP_STATUS.NOT_FOUND)
    //             .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
    // }
}

export default new UserGroupController()

