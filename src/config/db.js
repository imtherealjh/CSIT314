 const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();

const host = process.env.GITLAB_CI ? "mysql" : "localhost";

/*const sequelize = new Sequelize(
    'CSIT314','root','root',
    {
       host: host,
       dialect: 'mysql',
       port: 3306
    }
 );
 
sequelize
 //   .authenticate()
    .then(async() => {
        console.log('Connection has been established successfully.');
        console.log(await sequelize.model("authors"))
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
*/
const online = {
  host: "sql12.freemysqlhosting.net",   
  port: 3306,
  user: "sql12557404",
  password: "qMEJdmxJDA",
  database: "sql12557404",
};

const offline = {
  host: host,
  port: 3306,
  user: "root",
  password: "root",
  database: "CSIT314",
};

const connection = mysql.createConnection(online);

connection.connect((err) => {
  if (err) return console.log(err);
  console.log(`Database connected!!`);
});

module.exports = {
  connection: connection,
  query: (sql, params) => connection.promise().query(sql, params),
  transaction: () =>
    new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) reject(err);
        resolve();
      });
    }),
};
