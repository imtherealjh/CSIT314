const mysql = require('mysql2');
const {Sequelize, DataTypes} = require("sequelize");

require('dotenv').config()

const host = process.env.GITLAB_CI ? "mysql" : "localhost";

const sequelize = new Sequelize(
    'CSIT314','root','root',
    {
       host: host,
       dialect: 'mysql',
       port: 3306
    }
 );
 
sequelize
    .authenticate()
    .then(async() => {
        console.log('Connection has been established successfully.');
        /*const author = sequelize.define("users", {
            id: {
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
        });
        await sequelize.sync({force: true});*/
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    
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
    sequelize: sequelize,
    connection: connection,
    query: (sql, params) => connection.promise().query(sql, params),
    transaction: () => new Promise((resolve, reject) => {
                        connection.beginTransaction(async (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    })
};