import {Request} from "express";
import {TUser} from "../types/user.type";
import {v4 as uuidv4} from "uuid";
import {UserModel} from "../entity/user.model";
import db from "../models"
import {GroupModel} from "../entity/group.model";
import {TGroup} from "../types/group.type";


export class GroupService {

    constructor(private readonly model: GroupModel) {

    }

    get = (id: string) => {
        return this.model.findById(id)
    }

    create = (body: TGroup) => {
        return this.model.create(body)
    }

    update = (id: string, newGroup: TGroup) => {
        return this.model.update(id, newGroup)
    }

    getAll = () => {
        return this.model.getAll()
    }

    delete = (id: string) => {
        return this.model.remove(id)
    }
}
