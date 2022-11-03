const conn = require('../config/db');

module.exports = {
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1", [email], (err, rows) => {
                if(err) return reject(err)
                resolve(rows[0])
            })
        })
    }
};