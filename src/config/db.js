require("dotenv").config();
const { Sequelize } = require("sequelize");
const bcrypt = require("../utils/bcrypt");

const host = process.env.GITLAB_CI
  ? "mysql"
  : "containers-us-west-109.railway.app";

// const sequelize = new Sequelize("railway", "root", "TDTFWn4AcVZe0fqtNfnV", {
//   host: host,
//   dialect: "mysql",
//   port: 7315,
//   timezone: "+08:00",
// });

const sequelize = new Sequelize("CSIT314", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  timezone: "+08:00",
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });

    //check if there is an admin, else create one..
    const User = sequelize.models.users;
    const result = await User.findOne({ where: { user_id: 1 } });
    if (result == null) {
      const created_user = await User.create({
        user_id: 1,
        name: "admin",
        email: "admin@admin.com",
        // password:
        //   "$2b$10$dRQOabemjKTBO1wmctmqSeVcUMZjzWoHaDTZLwXpw0VJYO3ke.5J2",
        password: await bcrypt.hashPassword("jeff"),
      });

      const UserProfile = sequelize.models.users_profile;
      await UserProfile.create({
        user_id: created_user.user_id,
        role_name: "admin",
      });
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
