'use strict';

import {Model} from 'sequelize';
import {groupModelType} from "../types/modelTypes/group.model.type";
import {Permissions, TGroup} from "../types/group.type";
import {userGroupModel} from "../types/modelTypes/user.group.model";

export type TUserGroup = {
  UserId: string;
  GroupId: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class UserGroup extends Model<TUserGroup> implements TUserGroup{

    UserId!: string;
    GroupId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
    }
  }
  UserGroup.init(userGroupModel,  {
    sequelize,
    modelName: 'UserGroup',
    freezeTableName: true
  });
  return UserGroup;
};
