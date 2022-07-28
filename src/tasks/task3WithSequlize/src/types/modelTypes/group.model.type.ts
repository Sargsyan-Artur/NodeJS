import {DataTypes} from "sequelize";
import {Permissions} from "../group.type";

export const groupModelType = {

    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        // autoIncrement: true
        defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
            values: [Permissions.READ, Permissions.SHARE, Permissions.DELETE, Permissions.WRITE, Permissions.UPLOAD_FILES]
        })),
        allowNull: false
    }
}
