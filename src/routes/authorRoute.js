const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const viewController = require("../controller/authorViewController");

router.get("/", viewController.renderMainMenu);
router.route("/paper")
        .get(viewController.retrieveAllPapers);
router.route("/paper/submit")
        .get(viewController.renderCreatePaper)
        .post(authorController.createPaper);
router.route("/paper/update")
        .get(viewController.renderUpdateAllPapers);
router.route("/paper/rate")
        .get(viewController.renderRateAllReviews);

// Register route with params after the all the routes have been registered
router.route("/paper/:id")
        .get(authorController.retrievePaper);
router.route("/paper/update/:id")
        .get(viewController.renderUpdatePaper)
        .post(authorController.updatePaper);
router.route("/paper/rate/:id")
        .get(viewController.renderRateReview)
        .post(authorController.ratePaper);

module.exports = router;