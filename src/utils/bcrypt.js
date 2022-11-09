const bcrypt = require('bcrypt');

module.exports = {
    comparePassword: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, result) {
                if(err) return reject(err);
                return resolve(result)
            })
        });
    },
    hashPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function(err, result) {
                if(err) return reject(err);
                return resolve(result);
            })
        });
    }
};