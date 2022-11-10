const mysql = require('mysql2');
require('dotenv').config()

const host = process.env.GITLAB_CI ? "mysql" : "localhost";

const online = {
    host: "sql12.freemysqlhosting.net",
    port: 3306,
    user: "sql12557404",
    password: "qMEJdmxJDA",
    database: "sql12557404"
}

const offline = {
    host: host,
    port: 3306,
    user: "root",
    password: "root",
    database: "CSIT314"
}

const connection = mysql.createConnection(offline);

connection.connect((err) => {
    if(err) return console.log(err);
    console.log(`Database connected!!`)
});

module.exports = {
    connection: connection,
    query: (sql, params) => connection.promise().query(sql, params),
    transaction: () => new Promise((resolve, reject) => {
                        connection.beginTransaction(async (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    })
};