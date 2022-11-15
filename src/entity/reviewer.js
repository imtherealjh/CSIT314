const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

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
  createPaperReview: (paperId, data) => {
    return Reviews.create({
      ...data,
      review_id: paperId,
    })
  },
  upsertPaperReview: (paperId, data) => {
    return Reviews.upsert({
      ...data,
      review_id: paperId,
    })
  },
  removePaperReview: (review_id) => {
    return Reviews.destroy({
      where: {
        review_id: review_id,
      }
    })
  },
  createBids: (bids) => {
    return Bids.bulkCreate(bids, { raw: true });
  },
  createComments: (reviewId, comm, userId) => {
    return Comments.create({ comments: comm, review_id: reviewId , user_id : userId});
  },
  deleteComment: (comment_id) => {
    return Comments.destroy({
      where: {
        comment_id: comment_id
      }
    })
  },
  getCommentsById: (id) => {
    return Comments.findByPk(id);
  },
  getReviewsById: (id) => {
    return Reviews.findByPk(id);
  },
  getAllCommentsByPaperId: (id) => {
    return Comments.findAll({
      where: {
        review_id: {
          [Op.eq]: id
        },
      },
      include: [
        {
           model: User
        },
       ]
    });
  },
};
