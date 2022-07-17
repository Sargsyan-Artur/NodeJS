import {Request} from "express";
import {TUser} from "../types/user.type";
import {v4 as uuidv4} from "uuid";

class UserService{
    users: TUser[] = [
        {
            id: "1",
            name: "name of user vagrik1",
            isDeleted: false,
            age: 6,
            login: "password",
            password: "asd"
        },
        {
            id: "2",
            name: "name of user vagr ik3",
            isDeleted: false,
            age: 6,
            login: "vagrikner3",
            password: "asdddddddddddddddddddddd"
        },
        {
            id: "3",
            name: "name of user vagr ik2",
            isDeleted: false,
            age: 6,
            login: "vagrikner2",
            password: "asdddddddddddddddddddddd"
        },
        {
            id: "4",
            name: "name of user Chabku",
            isDeleted: false,
            age: 6,
            login: "vagrikner1",
            password: "asdddddddddddddddddddddd"
        }
    ]

    getUser = (req: Request) => {
        return this.users.find((user: TUser) => user.id === req.params.id)
    }

    createUser = (body: TUser) => {
        this.users.push({
            ...body,
            id: uuidv4(),
        })
        return this.users[this.users.length - 1]
    }

    updateUser = (req: Request) => {
        let user: TUser | undefined = this.users.find((user: TUser) => user.id === req.params.id)
        return user ? Object.assign({}, user, req.body) : undefined
    }

    searchUsers = (req: Request) => {
        const limit = Number(req.query.limit) || 1
        const substring = req.query.substring as string

        let searchedUsers: TUser[] = this.users.filter((user) => {
            return (user.login).includes(substring)
        })

        return searchedUsers.length >= limit ? searchedUsers
            .sort((a: TUser, b: TUser) => (a.login > b.login) ? 1 : -1)
            .splice(0, limit) : searchedUsers
    }

    deleteUser = (req: Request) => {
        let user: TUser | undefined = this.users.find((user: TUser) => user.id === req.params.id)
        user ? user.isDeleted = true : undefined
        return user
    }
}

export default new UserService()
