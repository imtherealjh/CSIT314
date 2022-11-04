const conn = require('../config/db');

module.exports = {
    computeAdd: async (req, res) => {
        await conn.promise().execute("CREATE TABLE USER(id int PRIMARY KEY auto_increment,username varchar(45), password varchar(45))")
        let result = await conn.promise().query("SELECT * FROM USER");
        conn.end();
        console.log("Hello")
        return res.send(result[0])
    },
};