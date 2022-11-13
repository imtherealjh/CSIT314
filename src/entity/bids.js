const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const User = sequelize.models.users;
const Paper = sequelize.models.papers;
const Bids = sequelize.models.bids;

module.exports = {
  getBidsByPaperId: (paper_id) => {
    return Paper.findByPk(paper_id, {
      include: {
        model: User,
        as: "reviewer",
        required: true,
        include: [
          {
            attributes: ["createdAt"],
            model: Bids,
            as: "userBids",
            required: true,
            separate: true,
            order: [["createdAt", "ASC"]],
          },
        ],
      },
    });
  },
};
