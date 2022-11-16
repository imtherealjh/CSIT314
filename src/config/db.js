require("dotenv").config();
const { Sequelize } = require("sequelize");

const RAILWAY_URL = "containers-us-west-109.railway.app";

const host = process.env.GITLAB_CI ? "mysql" : RAILWAY_URL;

const offline = process.env.GITLAB_CI ? "mysql" : "localhost";

const sequelize = new Sequelize(
  host !== "mysql" ? "railway" : "CSIT314",
  "root",
  host !== "mysql" ? "TDTFWn4AcVZe0fqtNfnV" : "root",
  {
    host: host,
    dialect: "mysql",
    port: host !== "mysql" ? 7315 : 3306,
    timezone: "+08:00",
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    if (host === RAILWAY_URL) {
      
      await require("./setup_db")(sequelize);
    }
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

require("./associations")(sequelize);

module.exports = db;
