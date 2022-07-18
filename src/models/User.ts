'use strict';
import {Model} from 'sequelize';
import {userModelType} from "../types/modelTypes/user.model.type";

interface IUser {
  user_id?: string,
  name?: string
  login: string,
  password: string,
  age: number,
  isDeleted: boolean
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model implements IUser{

    user_id!: string
    name!: string
    login!: string
    password!: string
    age!: number
    isDeleted!: boolean
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `entity/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  User.init(userModelType, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};
