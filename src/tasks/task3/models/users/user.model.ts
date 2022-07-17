import { DataTypes } from 'sequelize';
import { dbConnector } from '../connection'
import {CreationAttributes, ModelAttributes} from "sequelize/types/model";
import {TableName} from "sequelize/types/dialects/abstract/query-interface";
import {TUser} from "../../types/user.type";
import {userDbTableTypes} from "./user.db.type";
import {defaults} from "joi";


const Sequelize = require("sequelize");

const User = dbConnector.define(
    "a", userDbTableTypes,  { freezeTableName: true }
);

User.sync();

class UserModel {
    async findById(id: string) {
        try {
            let user = await User.findOne({
                where: { id }
            });
            console.log("user==============get===", user!.toJSON())
            return user!.toJSON();
        } catch (err) {
            console.log(err)

            return err
        }

    }

    async create(user: TUser) {
        try{
            console.log("user=========", user)
            return User.create(user);
        }catch(exe){
            console.log(exe);
        }
    }

    async remove(id: string) {
        try{
            console.log(id)
            let user = await User.update(
                { isDeleted: true },
                {
                    where: { id },
                    returning: true,
                }
            );
            console.log("delete=====", user[1])
            return user[1];
        } catch(err) {
            console.log("Error", err);
            return
        }


    }

    async update(id: string, newUser: TUser) {
        try {
            let user = await User.update(newUser, {
                where: { id, isDeleted: false },
                returning: true,
            });
            return user ? user[1] : null;
        } catch (exe) {
            return null;
        }
    }

    async search(limit: number, login: string) {
        let iLike = Sequelize.Op.iLike;
        let users = await User.findAll({
            limit: limit,
            where: { login: { [iLike]: login + "%" }, isDeleted: false }
        });
        return users;
    }
}

// async function findById(id: string) {
//     let user = await User.findOne({
//         where: { id }
//     });
//     return user;
// }
//
// async function create(user: TUser) {
//     try{
//         console.log("user=========", user)
//         return User.create(user);
//     }catch(exe){
//         console.log(exe);
//     }
// }
//
// async function remove(id: string) {
//     try{
//         console.log(id)
//         let user = await User.update(
//             { isDeleted: true },
//             {
//                 where: { id },
//                 returning: true,
//             }
//         );
//         console.log("delete=====", user[1])
//         return user[1];
//     } catch(err) {
//         console.log("Error", err);
//         return
//     }
//
//
// }
//
// async function update(id: string, newUser: TUser) {
//     try {
//         let user = await User.update(newUser, {
//             where: { id, isDeleted: false },
//             returning: true,
//         });
//         return user ? user[1] : null;
//     } catch (exe) {
//         return null;
//     }
// }
//
// async function search(limit: number, login: string) {
//     let iLike = Sequelize.Op.iLike;
//     let users = await User.findAll({
//         limit: limit,
//         where: { login: { [iLike]: login + "%" }, isDeleted: false }
//     });
//     return users;
// }

// default export = { findById, create, remove, update, search };
// export {findById, create, remove, update, search }

export default new UserModel()
