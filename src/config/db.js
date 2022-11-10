const mysql = require('mysql2');
require('dotenv').config()

const host = process.env.GITLAB_CI ? "mysql" : "localhost";

const connection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    port: 3306,
    user: "sql12557404",
    password: "qMEJdmxJDA",
    database: "sql12557404"
});

connection.connect((err) => {
    if(err) return console.log(err);
    console.log(`Database connected!!`)
})

module.exports = {
    connection: connection,
    query: (sql, params) => connection.promise().query(sql, params)
};