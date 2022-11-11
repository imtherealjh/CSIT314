const {query, sequelize} = require('../config/db');
const { Model, DataTypes } = require("sequelize");
const { userProfile } = require("../models/userProfileModel");

class User extends Model {};
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

User.hasOne(userProfile, {foreignKey: 'userid', sourceKey: 'userid'})

module.exports = {
    User: User,
    getAllUserDetails: async () => {
        const result = await User.findAll({raw: true});
        return result;
    }, 
    getAllUserDetailsByEmail: async (email) => {
        const result = await User.findAll({
            where: {
                email: email
            },
            include: [{
                model: userProfile,
                required: true
            }],
            raw: true
        });
        console.log(result);
        const sql = "SELECT * FROM users u LEFT JOIN users_profile up" +
                        " ON u.user_id = up.user_id WHERE u.EMAIL = ?";
        const [rows] = await query(sql, [email]);
        return rows[0];
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
        const sql = "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";
        return query(sql, [name, email, password]);
    },
    updateUser: (user_id, name, email, password) => {
        const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?";
        return query(sql, [name, email, password, user_id]);
    },
    getUserWithoutProfile: async () => {
        const sql = "SELECT user_id, name FROM users WHERE user_id NOT IN" + 
                        " (SELECT user_id FROM users_profile)";
        const [rows] = await query(sql);
        return rows;
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