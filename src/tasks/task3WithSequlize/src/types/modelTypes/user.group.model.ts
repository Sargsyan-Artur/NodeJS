import {DataTypes} from "sequelize";

export const userGroupModel = {
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "User",
            key: "id"
        }
    },

    GroupId: {
        type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "Group",
                key: "id"
        }
    }
}
