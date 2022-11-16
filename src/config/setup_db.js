const bcrypt = require("../utils/bcrypt");

async function setup_users(sequelize) {
  //check if there is an admin, else create one..
  const User = sequelize.models.users;
  const UserProfile = sequelize.models.users_profile;
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

    await UserProfile.create({
      user_id: created_user.user_id,
      role_name: "admin",
    });
  }

  for (var i = 1; i < 6; i++) {
    await User.create({
      user_id: i + 1,
      name: "review" + i,
      email: "review" + i + "@review.com",
      password: await bcrypt.hashPassword("jeff"),
    });

    await UserProfile.create({
      user_id: i + 1,
      role_name: "reviewer",
    });
  }

  startIdx = 5;
  for (var i = 1; i < 6; i++) {
    await User.create({
      user_id: startIdx + i + 1,
      name: "author" + i,
      email: "author" + i + "@author.com",
      password: await bcrypt.hashPassword("jeff"),
    });

    await UserProfile.create({
        user_id: startIdx + i + 1,
        role_name: "author",
      });
  }
}

module.exports = async (sequelize) => {
  await setup_users(sequelize);
};
