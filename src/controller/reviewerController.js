// should be model/entity
const reviewerModel = require("../entity/reviewer");

module.exports = {
  updateMaxNoOfPaper: async (req, res) => {
    const { maxNo } = req.body;
    const { userid } = req.session;

    try {
      await reviewerModel.updateMaxNoOfPaper(userid, maxNo);
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/reviewer");
  },
  updatePaperReview: async (req, res) => {
    const { ratings, reviews, paper_id } = req.body;

    try {
      await reviewerModel.updatePaperReview(paper_id, {
        ratings,
        reviews
      });
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/reviewer/review-paper");
  },
  createComments: async (req, res) => {
    const { comments, paper_id: reviewId } = req.body;
    const { userid } = req.session;
    try {
      await reviewerModel.createComments(reviewId, comments, userid)
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/reviewer/papers/"+reviewId);
  },
  
  deleteComment: async (req, res) => {
    const {  comment_id } = req.params;
    try {
      await reviewerModel.deleteComment(comment_id)
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/reviewer/papers/");
  },
  removePaperReview: async (req, res) => {
    const { id } = req.params;

    try {
      await reviewerModel.updatePaperReview(id, {
        ratings: null,
        reviews: null
      });
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/reviewer/review-paper");
  },
  submitBids: async (req, res) => {
    let { userid } = req.session;
    let { papers } = req.body;
    // userid = 2
    try {
      biddedPaper = [...papers];
      biddedPaper = biddedPaper.map((paper_id) => {
        return { reviewer_id: userid, paper_id: Number(paper_id) };
      });

      await reviewerModel.createBids(biddedPaper);
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/reviewer");
  },
  removeBids: async (req, res) => {
    let { userid } = req.session;
    let { papers } = req.body;
    // userid = 2
    try {
      papers = typeof papers == "string" ? [papers] : papers;
      papers.forEach(async(paper_id) => await reviewerModel.removeBids(userid, paper_id))
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/reviewer");
  },
};
