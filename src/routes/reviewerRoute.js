const express = require("express");
const router = express.Router();
const reviewerController = require("../controller/reviewerController");
const viewController = require("../controller/reviewerViewController");

const adminController = require("../controller/adminController");

router.use(async (req, res, next) => {
  const {userid} = req.session;
  const user = await adminController.getUserProfileById(userid);
  if(user["profile.role_name"] !== "reviewer") {
    return res.redirect("/login");
  }
  next();
});


router.get("/", viewController.renderMainMenu);
router
  .route("/bids/submit")
  .get(viewController.renderSubmitBids)
  .post(reviewerController.submitBids);
router
  .route("/bids/remove")
  .get(viewController.renderRemoveBids)
  .post(reviewerController.removeBids);
router
  .route("/specify/max-no-of-paper")
  .get(viewController.renderMaxNoOfPaper)
  .post(reviewerController.updateMaxNoOfPaper);
router
  .route("/papers")
  .get(viewController.renderListPapers)
router
    .route("/papers/:id")
    .get(viewController.renderListPapersComments)
    .post(reviewerController.createComments);
router
  .route("/comment/:comment_id/remove")
  .post(reviewerController.deleteComment);
router
  .route("/review-paper")
  .get(viewController.renderReviewPaperList)
router
  .route("/review-paper/:id")
  .get(viewController.renderReviewPaper)
  .post(reviewerController.updatePaperReview);
router
.route("/review-paper/:id/remove")
.post(reviewerController.removePaperReview);

module.exports = router;
