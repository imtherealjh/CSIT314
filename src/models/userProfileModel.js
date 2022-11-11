const {sequelize} = require("../config/db");
const { Model, DataTypes } = require("sequelize");

class UserProfile extends Model {
    static associate(models) {
        UserProfile.belongsTo(models.users, {
            foreignKey: "user_id",
            targetKey: "user_id"
        });
    }
};

UserProfile.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: sequelize.models.users,
                key: "user_id"
            }
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('role_name');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        }
    } , {
        sequelize,
        modelName: "users_profile",
        tableName: "users_profile",
        underscore: true,
        updatedAt: false,
        createdAt: false
    }
);

module.exports = {
    getUserProfiles: () => {
        const User = sequelize.models.users;
        return User.findAll({
            attributes: ["user_id", "name", [sequelize.col("profile.role_name"), "role_name"]],
            include: [{
                as: "profile",
                model: UserProfile,
                required: true,
            }],
            raw: true
        });
    },
    getUserProfileById: async (user_id) => {
        const User = sequelize.models.users;
        return User.findOne({
            attributes: ["user_id", "name", [sequelize.col("profile.role_name"), "role_name"]],
            include: [{
                as: "profile",
                model: UserProfile,
                required: true,
            }],
            where: {
                user_id: user_id
            },
            raw: true
        });
    },
    createUserProfile: (user_id, role_name) => {
        return UserProfile.create(
            {user_id: user_id, role_name: role_name},
            {raw: true}
        )
    },
    updateUserProfile: (user_id, role_name) => {
        return UserProfile.update(
            {role_name: role_name},
            {where: {user_id: user_id} }
        )
    }
}