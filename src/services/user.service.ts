import {Request} from "express";
import {TUser} from "../types/user.type";
import {v4 as uuidv4} from "uuid";
import UserModel from "../entity/user.model";
import db from "../models"


export class UserService{
    constructor(protected model: typeof UserModel) {
    }

    getUser = (id: string) => {
        return this.model.findById(id)
    }

    createUser = (body: TUser) => {
        return this.model.create(body)
    }

    updateUser = (id: string, newUser: TUser) => {
        return this.model.update(id, newUser)
    }

    searchUsers = (limit: number, substring: string) => {
        return this.model.search(limit, substring)
    }

    deleteUser = (id: string) => {
        return this.model.remove(id)
    }
}
