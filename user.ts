'use strict';
import {userModelType} from "./src/types/modelTypes/user.model.type";
// import {Model} from "sequelize/types"
import {
  Model,
  Table,
  Column,
  HasMany,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  NotNull,
  NotEmpty
} from 'sequelize-typescript'

export interface IUser {
  user_id?: string,
  name?: string
  login: string,
  password: string,
  age: number,
  isDeleted: boolean
}

@Table
class UserDecorator extends Model implements IUser{

  @AutoIncrement
  @PrimaryKey
  @Column(DataType.UUIDV4)
  user_id?: string

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  login!: string

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  password!: string

  @AllowNull(false)
  @NotNull
  @Column(DataType.NUMBER)
  age!: number

  @AllowNull(false)
  @NotNull
  @Column(DataType.BOOLEAN)
  isDeleted!: boolean
}
