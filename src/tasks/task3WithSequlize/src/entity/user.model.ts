import db  from '../models'
import {TUser} from "../types/user.type";
import Sequelize, {BOOLEAN} from "sequelize";
import {logger} from "../middlewares/loggers";

export class UserModel {
    async findById(id: string) {
        console.log("id==", id)
        try {
            let user = await db.User.findOne({
                where: { id }
            });
            return user.toJSON();
        } catch (err) {
            logger.error(`UserModel -> find By Id\n${err}`)
            return err
        }
    }

    async create(user: TUser) {
        try{
            return db.User.create(user);
        }catch(err: any){
            return err.message
        }
    }

    async remove(id: string) {
        const transaction = await db.sequelize.transaction()
        try{
            let user = await db.User.update(
                { isDeleted: true },
                {
                    where: { id },
                    returning: true,
                    plain: true
                }, {transaction}
            );
            await db.UserGroup.destroy({
                where: {
                    UserId: id
                },
                transaction
            })
            transaction.commit()
            return user[1];
        } catch(err: any) {
            transaction.rollback()
            logger.error(`UserModel -> remove\n${err}`)
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
                plain: true
            });
            console.log("aaaaaauser=====", user[1])
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

    async login(name: string, password: string) {
        try {
            let user = await db.User.findOne({
                where: { name, password }
            });
            return user.toJSON();
        } catch (err) {
            logger.error(`UserModel -> find By Id\n${err}`)
            return err
        }
    }
}

export const userModel =  new UserModel()
