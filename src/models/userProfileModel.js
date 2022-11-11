const {query, sequelize} = require("../config/db");
const { Model, DataTypes } = require("sequelize");
const { User } = require("../models/adminModel") 

class UserProfile extends Model {
    static associate(models) {
        /*UserProfile.belongsTo(models.User, {
            foreignKey: "user_id",
            targetKey: "user_id"
        });*/
    }
};

UserProfile.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: "user_id"
            }
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } , {
        sequelize,
        modelName: "UserProfile",
        tableName: "users_profile",
        underscore: true,
        updatedAt: false,
        createdAt: false
    }
);

module.exports = {
    UserProfile: UserProfile,
    createUserProfile: (user_id, role_name) => {
        return UserProfile.create(
            {user_id: user_id, role_name: role_name},
            {raw: true}
        )
    },
}