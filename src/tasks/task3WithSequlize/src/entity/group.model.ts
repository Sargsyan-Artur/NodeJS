import db  from '../models'
import {TGroup} from "../types/group.type";

export class GroupModel {
    async create(group: TGroup) {
        try{
            return db.Group.create(group);
        }catch(exe){
            console.log(exe);
        }
    }

    async findById(id: string) {
        console.log("id==", id)
        try {
            let group = await db.Group.findOne({
                where: { id }
            });
            return group.toJSON();
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async remove(id: string) {
        try{
            let group = await db.Group.destroy(
                { where: { id } }
            );
            console.log("removed", group )
            return group;
        } catch(err: any) {
            return {
                error: err.message
            }
        }
    }

    async update(id: string, newGroup: TGroup) {
        try {
            let group = await db.Group.update(newGroup, {
                where: { id },
                returning: true,
                plain: true
            });
            console.log(group[1].dataValues)
            return group[1].dataValues;
        } catch(err: any) {
            console.log("err=======", err)
            return {
                error: err.message
            }
        }
    }

    async getAll() {
        return await db.Group.findAll();
    }
}

export const groupModel = new GroupModel()
