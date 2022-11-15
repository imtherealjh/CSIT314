const express = require("express");
const router = express.Router();
const reviewerController = require("../controller/reviewerController");
const viewController = require("../controller/reviewerViewController");

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
    .get(viewController.renderListPapersReview)
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
