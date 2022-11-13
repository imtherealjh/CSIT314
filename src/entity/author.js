const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const User = sequelize.models.users;
const UserProfile = sequelize.models.users_profile;
const Author = sequelize.models.authors;

module.exports = {
  getNonCurrentAuthor: (author_id) => {
    return User.findAll({
      include: [
        {
          as: "profile",
          model: UserProfile,
          required: true,
          where: {
            role_name: "author",
          },
        },
      ],
      where: {
        user_id: {
          [Op.ne]: author_id,
        },
      },
      raw: true,
    });
  },
  createLinkToAuthors: (co_authors) => {
    return Author.bulkCreate(co_authors, { raw: true });
  },
  removeLinkFromAuthors: (paper_id) => {
    return Author.destroy({
      where: {
        paper_id: paper_id,
      },
      force: true,
    });
  },
};
