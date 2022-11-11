const {query, sequelize} = require('../config/db');
const { Model, DataTypes, Op, Sequelize } = require("sequelize");
require("../models/userProfileModel");

const UserProfile = sequelize.models.users_profile;

class User extends Model {
    static associate(models) {
        
    }
};

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            get() {
                const rawValue = this.getDataValue('user_id');
                return rawValue ? rawValue : 0;
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('name');
                return rawValue ? rawValue : null;
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            get() {
                const rawValue = this.getDataValue('email');
                return rawValue ? rawValue : null;
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "users",
        tableName: "users",
        underscore: true,
        updatedAt: false,
        createdAt: false
    }
)

User.hasOne(UserProfile, {
    as: "profile",
    foreignKey: "user_id",
    sourceKey: "user_id"
});

module.exports = {
    getAllUserDetails: () => {
        return User.findAll({raw: true});
    }, 
    getAllUserDetailsByEmail: (email) => {
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
    },
    getUserWithoutProfile: () => {
        return User.findAll({
            where: {
                user_id: Sequelize.literal("`user_id` NOT IN (SELECT `up`.`user_id` FROM `users_profile` AS `up`)")
            },
            raw: true
        })
    },
    getReviewersById: async(user_id) => {
        const sql = "SELECT * FROM reviewers WHERE reviewer_id = ?";
        const [rows] = await query(sql, [user_id]);
        return rows[0];
    }
};