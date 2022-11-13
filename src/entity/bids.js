const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const User = sequelize.models.users;
const Paper = sequelize.models.papers;
const Bids = sequelize.models.bids;

module.exports = {
  getBidsByPaperId: (paper_id) => {
    return User.findAll({
      include: [
        {
          model: Bids,
          as: "userBids",
          attributes: [],
          required: true,
          where: {
            [Op.and]: [{ paper_id: paper_id }, {"allocated": false}],
          },
        },
      ],
      order: [["userBids", "createdAt", "DESC"]],
      raw: true,
      nest: true,
    });
  },
  getAllocatedBids: (paper_id) => {
    return User.findAll({
      include: [
        {
          model: Bids,
          as: "userBids",
          attributes: [],
          required: true,
          where: {
            [Op.and]: [{ paper_id: paper_id }, {"allocated": true}],
          },
        },
      ],
      order: [["userBids", "createdAt", "DESC"]],
      raw: true,
      nest: true,
    });
  },
  createPaperAllocation: (paper_id, allocations) => {
    return Bids.update(
      { allocated: true, successful: true },
      {
        where: {
          [Op.and]: [
            { paper_id: paper_id },
            { reviewer_id: { [Op.in]: allocations } },
          ],
        },
      }
    );
  },
};
