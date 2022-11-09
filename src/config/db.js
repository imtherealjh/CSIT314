const mysql = require('mysql2');
require('dotenv').config()

const host = process.env.GITLAB_CI ? "mysql" : "localhost";

const connection = mysql.createConnection({
    host: host,
    port: 3306,
    user: "root",
    password: "root",
    database: "CSIT314"
});

connection.connect((err) => {
    if(err) return console.log(err);
    console.log(`Database connected!!`)
})

module.exports = {
    connection: connection,
    query: (sql, params) => connection.promise().query(sql, params)
};