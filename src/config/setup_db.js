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

  const startIdx = 5;
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

  await User.create({
    user_id: 12,
    name: "cctest",
    email: "cctest" + i + "@cctest.com",
    password: await bcrypt.hashPassword("jeff"),
  });

  await UserProfile.create({
    user_id: 12,
    role_name: "conference-chair",
  });
}

async function setup_papers(sequelize) {
  const authors = sequelize.models.authors;
  const papers = sequelize.models.papers;

  const startIdx = 5;
  for (var i = 1; i < 6; i++) {
    await papers.create({
        paper_id: i,
        title: "test paper " + i,
        paper: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    });

    await authors.create({
        author_id: startIdx + i + 1,
        paper_id: i
    });
  }
}

module.exports = async (sequelize) => {
  await setup_users(sequelize);
  await setup_papers(sequelize);
};
