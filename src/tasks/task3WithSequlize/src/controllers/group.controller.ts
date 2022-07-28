import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS, MESSAGE} from "../constants/constants"
import {TGroup} from "../types/group.type"
import {GroupService} from "../services/group.service";
import {groupModel} from "../entity/group.model";
import {logger} from "../middlewares/loggers";

const groupService = new GroupService(groupModel)

class GroupController {

    async createGroup(req: Request, res: Response, next: NextFunction) {
        const body: TGroup = await req.body as TGroup

        const user = await groupService.create(body).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> createGroup(${JSON.stringify(body)}) \n[ERROR] - ${err.message}`)
        })

        user
            ? res.setHeader("Content-Type", "application/json").status(HTTP_STATUS.SUCCESS).json(user)
            : null

    }

    async getGroup(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const user = await groupService.get(id).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> getGroup(${JSON.stringify(id)}) \n[ERROR] - ${err.message}`)
        })

        user
            ? res
                .setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .json(user)
                .send(res.locals.user)
            : res
                .status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    async getGroups(req: Request, res: Response, next: NextFunction) {
        // const limit = Number(req.query.limit) || 1
        // const substring = req.query.substring as string
        const groups = await groupService.getAll().catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> getGroups() \n[ERROR] - ${err.message}`)
        })

        groups
            ? res.status(HTTP_STATUS.SUCCESS).json(groups)
            : res.status(HTTP_STATUS.NOT_FOUND).send(MESSAGE.NOT_FOUND)
    }

    async updateGroup(req: Request, res: Response, next: NextFunction) {
        const updatedGroup = await groupService.update(req.params.id, req.body).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> updateGroup(${req.params.id}, ${JSON.stringify(req.body)}) \n[ERROR] - ${err.message}`)
        })

        !updatedGroup.error
            ? res.status(HTTP_STATUS.SUCCESS)
                .setHeader("Content-Type", "application/json")
                .json(updatedGroup)
            : res.status(HTTP_STATUS.NOT_FOUND)
                .send(MESSAGE.NOT_FOUND)
    }

    async deleteGroup(req: Request, res: Response, next: NextFunction) {
        const response = await groupService.delete(req.params.id).catch(err => {
            next(err)
            logger.error(`${this.constructor.name} -> deleteGroup(${req.params.id}) \n[ERROR] - ${err.message}`)
        })

        !response.error
            ? res.setHeader("Content-Type", "application/json")
                .status(HTTP_STATUS.SUCCESS)
                .send(`${req.params.id} User is ${MESSAGE.DELETED}`)
            :
            res.status(HTTP_STATUS.NOT_FOUND)
                .send(`${req.params.id} User ${MESSAGE.NOT_FOUND}`)
    }
}

export const groupController = new GroupController()

