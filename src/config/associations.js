//declare association between models
module.exports = (sequelize) => {
  const User = require("../models/userModel")(sequelize);
  const UserProfile = require("../models/userProfileModel")(sequelize);

  const Author = require("../models/authorModel")(sequelize);
  const Paper = require("../models/paperModel")(sequelize);

  const Bids = require("../models/bidsModel")(sequelize);
  const reviews = require("../models/reviewModel")(sequelize);
  const comments = require("../models/commentModel")(sequelize);

  User.hasOne(UserProfile, {
    as: "profile",
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  UserProfile.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
  });

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

  User.belongsToMany(Paper, {
    as: "reviewer",
    through: Bids,
    foreignKey: "reviewer_id",
  });
  Paper.belongsToMany(User, {
    as: "reviewer",
    through: Bids,
    foreignKey: "paper_id",
  });

  User.hasMany(Bids, {
    as: "userBids",
    foreignKey: "reviewer_id",
  });

  Paper.hasMany(Bids, {
    as: "paperBids",
    foreignKey: "paper_id",
  });

  Bids.belongsTo(User, {
    as: "userBids",
    foreignKey: "reviewer_id",
  });

  Bids.belongsTo(Paper, {
    as: "paperBids",
    foreignKey: "paper_id",
  });

  Paper.hasOne(reviews, {
    foreignKey: "paper_id",
  });

  reviews.belongsTo(Paper, {
    foreignKey: "paper_id",
  });

  reviews.hasMany(comments, {
    foreignKey: "review_id",
    targetKey: "review_id",
  });

  comments.belongsTo(reviews, {
    foreignKey: "review_id",
    sourceKey: "review_id",
  });

  User.hasMany(comments, {
    foreignKey: "user_id",
    targetKey: "user_id",
  });

  comments.belongsTo(reviews, {
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  User.hasMany(reviews, {
    foreignKey: "user_id",
    targetKey: "user_id",
  });

  reviews.belongsTo(User, {
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  return sequelize;
};
