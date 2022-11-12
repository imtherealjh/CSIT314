const {sequelize} = require('../config/db');
const { Op, Sequelize} = require("sequelize");

const User = sequelize.models.users;
const UserProfile = sequelize.models.users_profile;

module.exports = {
    getAllUser: () => {
        return User.findAll({raw: true});
    }, 
    getUserByEmail: (email) => {
        return User.findOne({
            include: [{
                as: "profile",
                model: UserProfile,
                required: true,
            }],
            where: {
                email: email
            },
            raw: true
        });
    },
    getUserById: async(user_id) => {
        return User.findByPk(user_id);
    },
    getUserWithoutProfile: () => {
        return User.findAll({
            where: {
                user_id: Sequelize.literal("`user_id` NOT IN (SELECT `up`.`user_id` FROM `users_profile` AS `up`)")
            },
            raw: true
        })
    },
    createUser: (name, email, password) => {
        return User.create(
            {name: name, email: email, password: password},
            {raw: true}
        );
    },
    updateUser: (user_id, name, email, password) => {
        return User.update(
            {name: name, email: email, password: password},
            {where: {user_id: user_id} , raw:true }
        );
    }
};