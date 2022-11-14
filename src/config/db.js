require("dotenv").config();
const { Sequelize } = require("sequelize");
const bcrypt = require("../utils/bcrypt");

const host = process.env.GITLAB_CI ? "mysql" : "containers-us-west-109.railway.app";

const sequelize = new Sequelize("railway", "root", "TDTFWn4AcVZe0fqtNfnV", {
  host: host,
  dialect: "mysql",
  port: 7315,
  timezone: "+08:00"
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });

    //check if there is an admin, else create one..
    const User = sequelize.models.users;
    const result = await User.findOne({ user_id: 1 });
    if (result == null) {
      const created_user = await User.create({
        user_id: 1,
        name: "admin",
        email: "admin@admin.com",
        // password:
        //   "$2b$10$dRQOabemjKTBO1wmctmqSeVcUMZjzWoHaDTZLwXpw0VJYO3ke.5J2",
        password:
          await bcrypt.hashPassword("jeff"),
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

//declare association between models
const User = require("../models/userModel")(sequelize);
const UserProfile = require("../models/userProfileModel")(sequelize);

User.hasOne(UserProfile, {
  as: "profile",
  foreignKey: "user_id",
  sourceKey: "user_id",
});

UserProfile.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

const Author = require("../models/authorModel")(sequelize);
const Paper = require("../models/paperModel")(sequelize);

User.belongsToMany(Paper, {
  as: "author",
  through: Author,
  foreignKey: "author_id",
  sourceKey: "user_id",
});
Paper.belongsToMany(User, {
  as: "author",
  through: Author,
  foreignKey: "paper_id",
  sourceKey: "paper_id",
});

const Bids = require("../models/bidsModel")(sequelize);

User.belongsToMany(Paper, {
  as: "reviewer",
  through: Bids,
  foreignKey: "reviewer_id"
});
Paper.belongsToMany(User, {
  as: "reviewer",
  through: Bids,
  foreignKey: "paper_id"
});

User.hasMany(Bids, {
  as: "userBids",
  foreignKey: "reviewer_id",
});

Paper.hasMany(Bids, {
  as: "paperBids",
  foreignKey: "paper_id"
});

Bids.belongsTo(User, {
  as: "userBids",
  foreignKey: "reviewer_id",
});

Bids.belongsTo(Paper, {
  as: "paperBids",
  foreignKey: "paper_id"
});


module.exports = db;

/*
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
  sequelize: sequelize,
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
*/
