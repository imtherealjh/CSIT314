const bcrypt = require("../utils/bcrypt");

async function setup_users(sequelize) {
  //check if there is an admin, else create one..
  const User = sequelize.models.users;
  const UserProfile = sequelize.models.users_profile;
  const result = await User.findOne({ where: { user_id: 1 } });
  if (result == null) {
    const created_user = await User.create({
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

  const cc = await User.create({
    name: "cctest",
    email: "cctest@cctest.com",
    password: await bcrypt.hashPassword("jeff"),
  });

  await UserProfile.create({
    user_id: cc.user_id,
    role_name: "conference-chair",
  });

  for (var i = 1; i < 6; i++) {}
}

async function setup_papers(sequelize) {
  const authors = sequelize.models.authors;
  const papers = sequelize.models.papers;
  const User = sequelize.models.users;
  const UserProfile = sequelize.models.users_profile;
  const bids = sequelize.models.bids;
  const reviews = sequelize.models.reviews;

  for (var i = 1; i < 6; i++) {
    const author = await User.create({
      name: "author" + i,
      email: "author" + i + "@author.com",
      password: await bcrypt.hashPassword("jeff"),
    });

    await UserProfile.create({
      user_id: author.user_id,
      role_name: "author",
    });

    const reviewer = await User.create({
      name: "review" + i,
      email: "review" + i + "@review.com",
      password: await bcrypt.hashPassword("jeff"),
      max_no_of_paper: 2,
    });

    await UserProfile.create({
      user_id: reviewer.user_id,
      role_name: "reviewer",
    });

    const paper = await papers.create({
      title: "test paper " + i,
      paper:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    });

    const authorPapers = [
      { author_id: author.user_id, paper_id: paper.paper_id },
    ];
    await authors.bulkCreate(authorPapers);

    if (i >= 3 && i < 5) {
      const reviewerBid = [
        { reviewer_id: reviewer.user_id, paper_id: paper.paper_id },
      ];
      bids.bulkCreate(reviewerBid);
    }

    if (i >= 5) {
      const reviewerBid = [
        {
          reviewer_id: reviewer.user_id,
          paper_id: paper.paper_id,
          allocated: true,
          successful: true,
        },
      ];
      bids.bulkCreate(reviewerBid);

      const newReviews = [{
        user_id: reviewer.user_id,
        paper_id: paper.paper_id,
        ratings: 2,
        reviews: "This is a great paper to be reviewed"
      }]

      reviews.bulkCreate(newReviews)
    }
  }
}

module.exports = async (sequelize) => {
  await setup_users(sequelize);
  await setup_papers(sequelize);
};
