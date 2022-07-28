'use strict';

import {Model} from 'sequelize';
import {groupModelType} from "../types/modelTypes/group.model.type";
import {Permissions} from "../types/group.type";

export type TGroup = {
  id: string;
  name: string;
  permissions: Array<Permissions>;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Group extends Model<TGroup> implements TGroup{

    id!: string
    name!: string
    permissions!: Permissions[]
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Group.belongsToMany(models.User, { through: 'UserGroup' });
    }
  }
  Group.init(groupModelType, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
