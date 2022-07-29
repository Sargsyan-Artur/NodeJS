import db  from '../models'
import {TUser} from "../types/user.type";
import Sequelize, {BOOLEAN} from "sequelize";

class UserModel {
    async findById(id: string) {
        console.log("id==", id)
        try {
            let user = await db.User.findOne({
                where: { id }
            });
            return user!.toJSON();
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async create(user: TUser) {
        try{
            return db.User.create(user);
        }catch(exe){
            console.log(exe);
        }
    }

    async remove(id: string) {
        try{
            let user = await db.User.update(
                { isDeleted: true },
                {
                    where: { id },
                    returning: true,
                }
            );
            return user[1];
        } catch(err: any) {
            return {
               error: err.message
            }
        }
    }

    async update(id: string, newUser: TUser) {
        try {
            let user = await db.User.update(newUser, {
                where: { id, isDeleted: false },
                returning: true,
            });
            return user[1];
        } catch(err: any) {
            return {
                error: err.message
            }
        }
    }

    async search(limit: number, login: string) {
        let iLike = Sequelize.Op.iLike;
        let users = await db.User.findAll({
            limit: limit,
            where: { login: { [iLike]: login + "%" }, isDeleted: false }
        });
        return users;
    }
}

export default new UserModel()
