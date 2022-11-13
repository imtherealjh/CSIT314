const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const User = sequelize.models.users;
const Bids = sequelize.models.bids;

module.exports = {
  countNumberOfBids: (user_id) => {
    return User.count({
      include: [
        {
          model: Bids,
          as: "userBids",
          attributes: [],
          where: {
            allocated: true,
          },
        },
      ],
      where: {
        user_id: user_id,
      },
    });
  },
  getNonAllocatedBidsById: (paper_id) => {
    return User.findAll({
      include: [
        {
          model: Bids,
          as: "userBids",
          required: true,
          attributes: [],
          where: {
            [Op.and]: [{ paper_id: paper_id }, { allocated: false }],
          },
        },
      ],
      order: [["userBids", "createdAt", "DESC"]],
      raw: true,
      nest: true,
    });
  },
  getAllocatedBidsById: (paper_id) => {
    return User.findAll({
      include: [
        {
          model: Bids,
          as: "userBids",
          attributes: [],
          required: true,
          where: {
            [Op.and]: [{ paper_id: paper_id }, { allocated: true }],
          },
        },
      ],
      order: [["userBids", "createdAt", "DESC"]],
      raw: true,
      nest: true,
    });
  },
  createPaperAllocation: (paper_id, allocated) => {
    console.log(allocated, paper_id);
    return Bids.update(
      { allocated: true },
      {
        where: {
          [Op.and]: [
            { paper_id: paper_id },
            { reviewer_id: { [Op.in]: allocated } },
          ],
        },
      }
    );
  },
  updateSuccessfulBids: (paper_id, allocated) => {
    return Bids.update(
      { successful: true },
      {
        where: {
          [Op.and]: [
            { paper_id: paper_id },
            { reviewer_id: { [Op.in]: allocated } },
          ],
        },
      }
    );
  },
  updateFailedBids: (paper_id, allocated) => {
    return Bids.update(
      { allocated: false, successful: false },
      {
        where: {
          [Op.and]: [
            { paper_id: paper_id },
            { allocated: { [Op.ne]: true } },
            { reviewer_id: { [Op.notIn]: allocated } },
          ],
        },
      }
    );
  },
  removeAllocation: (paper_id, allocated) => {
    return Bids.update(
      { allocated: false },
      {
        where: {
          [Op.and]: [
            { paper_id: paper_id },
            { reviewer_id: { [Op.notIn]: allocated } },
          ],
        },
      }
    );
  },
};
