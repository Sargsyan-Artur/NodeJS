import {Request, Response, NextFunction} from "express";
import {UserService} from "../../services/user.service"
import {TUser} from "../../types/user.type";
import {HTTP_STATUS, MESSAGE} from "../../constants/constants";

jest.mock('../helpers/translationsService', () => () => ({
    strings: {
        polish: {
            agree: 'tak',
            disagree: 'nie',
        },
        malaysian: {
            agree: 'ya',
            disagree: 'tidak',
        },
    },
}));

export class UserController {
    createUser(req: Request, res: Response) {
        // const body: TUser = req.body as TUser
        // const user = userService.createUser(body)
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

