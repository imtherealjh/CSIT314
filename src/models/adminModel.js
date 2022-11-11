const {query, sequelize} = require('../config/db');
const { Model, DataTypes, Op, Sequelize } = require("sequelize");
const { UserProfile } = require("../models/userProfileModel");

class User extends Model {
    static associate(models) {
        
    }
};

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "user",
        tableName: 'users',
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

UserProfile.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id"
});

module.exports = {
    User: User,
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
        const sql = "SELECT * FROM users WHERE USER_ID = ?";
        const [rows] = await query(sql, [user_id]);
        return rows[0];
    },
    getUserDetailsById: async(user_id) =>{
        const sql = "SELECT user_id, name, email FROM users WHERE user_id = ?";
        const [rows] = await query(sql, [user_id]);
        return rows;
    },
    createUser: (name, email, password) => {
        return User.create(
            {name: name, email: email, password: password},
            {raw: true}
        );
    },
    updateUser: (user_id, name, email, password) => {
        const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?";
        return query(sql, [name, email, password, user_id]);
    },
    getUserWithoutProfile: () => {
        return User.findAll({
            where: {
                user_id: Sequelize.literal("`user_id` NOT IN (SELECT `up`.`user_id` FROM `users_profile` AS `up`)")
            },
            raw: true
        })
    },
    getUserProfiles: async () => {
        const sql = "SELECT u.user_id, name, role_name FROM users u INNER JOIN" +
                        " users_profile up ON u.user_id = up.user_id";
        const [rows] = await query(sql);
        return rows;
    },
    getUserProfileById: async (user_id) => {
        const sql = "SELECT u.user_id, name, role_name FROM users u INNER JOIN" 
                        + " users_profile up ON u.user_id = up.user_id WHERE u.user_id = ?";
        const [rows] = await query(sql, [user_id]);
        return rows;
    },
    getReviewersById: async(user_id) => {
        const sql = "SELECT * FROM reviewers WHERE reviewer_id = ?";
        const [rows] = await query(sql, [user_id]);
        return rows[0];
    },
    createUserProfile : (user_id, role_name) => {
        const sql = "INSERT INTO users_profile(user_id, role_name) VALUES (?,?)";
        return query(sql, [user_id, role_name]);
    },
    updateUserProfile: (user_id, role_name) => {
        const sql = "UPDATE users_profile SET role_name = ? WHERE user_id = ?";
        return query(sql, [role_name, user_id]);
    }
};