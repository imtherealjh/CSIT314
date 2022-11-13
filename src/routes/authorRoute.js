const express = require("express");
const router = express.Router();
const viewController = require("../controller/authorViewController");

router.get("/", viewController.renderMainMenu);
router.get("/paper", viewController.renderViewPapers);

router
  .route("/paper/submit")
  .get(viewController.renderCreatePaper)
  .post(viewController.createPaperHandler);
router.route("/paper/update").get(viewController.renderUpdateAllPapers);
router.route("/paper/rate").get(viewController.renderRateAllReviews);

// Register route with params after the all the routes have been registered
router
  .route("/paper/update/:id")
  .get(viewController.renderUpdatePaper)
  .post(viewController.updatePaperHandler);
router
  .route("/paper/rate/:id")
  .get(viewController.renderRateReview)
  .post(viewController.ratePaperHandler);
router.get("/paper/:id", viewController.renderSinglePaper);

module.exports = router;
