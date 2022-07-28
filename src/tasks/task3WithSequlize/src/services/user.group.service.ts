import {Request} from "express";
import {TUser} from "../types/user.type";
import {v4 as uuidv4} from "uuid";
import {UserModel} from "../entity/user.model";
import db from "../models"
import {UserGroupModel} from "../entity/user.group.model";
import {TGroup} from "../types/group.type";


export class UserGroupService {

    constructor(private readonly model: UserGroupModel) { }

    addUsersToGroup(userId: string, groupId: string) {
        return this.model.addUsersToGroup(userId, groupId)
    }


    // create = (body: TUser) => {
    //     return this.model.create(body)
    // }
    //
    // get = (id: string) => {
    //     return this.model.findById(id)
    // }
    //
    // update = (id: string, newUser: TUser) => {
    //     return this.model.update(id, newUser)
    // }
    //
    // search = (limit: number, substring: string) => {
    //     return this.model.search(limit, substring)
    // }
    //
    // delete = (id: string) => {
    //     return this.model.remove(id)
    // }
}
