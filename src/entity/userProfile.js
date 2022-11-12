const {sequelize} = require("../config/db");

const User = sequelize.models.users;
const UserProfile = sequelize.models.users_profile;

module.exports = {
    getUserProfiles: () => {
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