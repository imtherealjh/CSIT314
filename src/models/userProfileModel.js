const {query, sequelize} = require("../config/db");
const { Model, DataTypes } = require("sequelize");
const { User } = require("../models/adminModel") 

class UserProfile extends Model {};
UserProfile.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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

UserProfile.belongsTo(User, {foreignKey: 'user_id', targetKey:"user_id"});

module.exports = {
    UserProfile: UserProfile,

}