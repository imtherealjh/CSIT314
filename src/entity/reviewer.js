const { sequelize } = require("../config/db");

const User = sequelize.models.users;
const Bids = sequelize.models.bids;
const Papers = sequelize.models.papers;
const Reviews = sequelize.models.reviews;
const Comments = sequelize.models.comments;

module.exports = {
  getMaxNoOfPaper: async (reviewer_id) => {
    return User.findByPk(reviewer_id, {
      attributes: ["max_no_of_paper"],
    });
  },
  getBiddedPapers: async (reviewer_id) => {
    const bids = await Bids.findAll({
      where: {
        reviewer_id: reviewer_id
      },
      include: [
        {
          as: "paperBids",
          model: Papers,
          required: true,
        },
      ],
    })
    return bids
  },
  getAllocatedPapers: async (reviewer_id) => {
    const bids = await Bids.findAll({
      where: {
        reviewer_id: reviewer_id,
        allocated: 1,
        successful: 1,
      },
      include: [
        {
          as: "paperBids",
          model: Papers,
          required: true,
        },
      ],
    })
    return bids
  },
  removeBids:async  (userid, paper_id) => {
    return Bids.destroy({
      where: {
        reviewer_id: userid,
        paper_id: paper_id
      }
    })
  },
  updateMaxNoOfPaper: (reviewer_id, max_no_of_paper) => {
    return User.update(
      { max_no_of_paper: max_no_of_paper },
      {
        where: {
          user_id: reviewer_id,
        },
      }
    );
  },
  updatePaperReview: (paperId, data) => {
    return Papers.update(
      data,
      {
        where: {
          paper_id: paperId,
        },
      }
    );
  },
  createBids: (bids) => {
    return Bids.bulkCreate(bids, { raw: true });
  },
  getReviewedPapers: async (reviewer_id) => {
    const reviews = await Reviews.findAll({
      where: {
        reviewer_id: reviewer_id
      },
      include: [
        {
          as: "paperReview",
          model: Papers,
          required: true,
        },
      ],
    })
    return reviews
  },
  getComments: async (reviewer_id) => {
    return Comments.findByPk(reviewer_id, {
      attributes: ["comments"],
    });
  },
};
