import {Request} from "express";
import {TUser} from "../types/user.type";
import {v4 as uuidv4} from "uuid";
import {UserModel} from "../entity/user.model";
import db from "../models"
import {GroupModel} from "../entity/group.model";
import {TGroup} from "../types/group.type";


export class UserService {

    constructor(private readonly model: UserModel) {

    }

    get(id: string) {
        return this.model.findById(id)
    }

    create(body: TUser) {
        return this.model.create(body)
    }

    update(id: string, newUser: TUser) {
        return this.model.update(id, newUser)
    }

    search(limit: number, substring: string) {
        return this.model.search(limit, substring)
    }

    delete(id: string) {
        return this.model.remove(id)
    }

    login(name: string, password: string) {
        return this.model.login(name, password)
    }
}


// private model1: UserModel;
// private model2: GroupModel;
//
// // constructor();
// constructor(a: new () => GroupModel);
// constructor(b: UserModel) {
//     this.a = model1
// }
