import {DataTypes} from "sequelize";

export const userModelType = {

    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        // autoIncrement:true
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}
