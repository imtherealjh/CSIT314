const {query} = require('../config/db');

module.exports = {
    getAllUserDetails: async () => {
        const sql = "SELECT user_id, name, email FROM users";
        const [rows] = await query(sql);
        return rows;
    }, 
    getAllUserDetailsByEmail: async (email) => {
        const sql = "SELECT * FROM users u LEFT JOIN users_profile up" +
                        " ON u.user_id = up.user_id WHERE u.EMAIL = ?";
        const [rows] = await query(sql, [email]);
        return rows[0];
    },
    getUserById: async(id) => {
        const sql = "SELECT * FROM USERS WHERE USER_ID = ?";
        const [rows] = await query(sql, [id]);
        return rows[0];
    },
    getUserDetailsById: async(id) =>{
        const sql = "SELECT user_id, name, email FROM users WHERE user_id = ?";
        const [rows] = await query(sql, [id]);
        return rows;
    },
    createUser: (name, email, password) => {
        const sql = "INSERT INTO USERS(name, email, password) VALUES (?, ?, ?)";
        return query(sql, [name, email, password]);
    },
    updateUser: (id, name, email, password) => {
        const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?";
        return query(sql, [name, email, password, id]);
    },
    getUsersWithoutProfile: async () => {
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
    getUserProfileById: async (id) => {
        const sql = "SELECT u.user_id, name, role_name FROM users u INNER JOIN" 
                        + " users_profile up ON u.user_id = up.user_id WHERE u.user_id = ?";
        const [rows] = await query(sql, [id]);
        return rows;
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