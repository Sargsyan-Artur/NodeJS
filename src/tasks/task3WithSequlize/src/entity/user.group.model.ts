import db from '../models'

import {TUser} from "../types/user.type";
// import sequelize, {BOOLEAN} from "sequelize";
// const t = db.transaction();

export class UserGroupModel {

    async addUsersToGroup(userId: string, groupId: string) {
        const transaction = await db.sequelize.transaction();
        try {
            console.log("aidddddddd---", userId, groupId)

            // console.log("tram=====", t)
            // const result = await db.sequelize.transaction(async (t:any) => {
            // const t = await db.sequelize.transaction()
            console.log("ttt=========", transaction)
            const user = await db.UserGroup.create({
                UserId: userId,
                GroupId: groupId
            }, {transaction});
            transaction.commit()
            return user;
        } catch (error) {
            transaction.rollback()
            return {
                error: error
            }
        }
    }

    async remove(id: string, groupId: string) {
    }
    // async create(user: TUser) {
    //     try{
    //         console.log("aaaaaaa", user)
    //         const a = db.User.create(user)
    //         console.log("aaaaaauser=====", a)
    //
    //         return a;
    //     }catch(exe){
    //         console.log(exe);
    //     }
    // }

    // async findById(id: string) {
    //     console.log("id==", id)
    //     try {
    //         let user = await db.User.findOne({
    //             where: { id }
    //         });
    //         return user.toJSON();
    //     } catch (err) {
    //         console.log(err)
    //         return err
    //     }
    // }

    //
    // async remove(id: string) {
    //     try{
    //         let user = await db.User.update(
    //             { isDeleted: true },
    //             {
    //                 where: { id },
    //                 returning: true,
    //                 plain: true
    //             }
    //         );
    //         return user[1];
    //     } catch(err: any) {
    //         return {
    //            error: err.message
    //         }
    //     }
    // }
    //
    // async update(id: string, newUser: TUser) {
    //     try {
    //         let user = await db.User.update(newUser, {
    //             where: { id, isDeleted: false },
    //             returning: true,
    //             plain: true
    //         });
    //         console.log("aaaaaauser=====", user[1])
    //         return user[1];
    //     } catch(err: any) {
    //         return {
    //             error: err.message
    //         }
    //     }
    // }
    //
    // async search(limit: number, login: string) {
    //     let iLike = Sequelize.Op.iLike;
    //     let users = await db.User.findAll({
    //         limit: limit,
    //         where: { login: { [iLike]: login + "%" }, isDeleted: false }
    //     });
    //     return users;
    // }
}

export const userGroupModel =  new UserGroupModel()
