const express = require("express");
const router = express.Router();
const authorController = require('../controller/authorController')

router.get("/", authorController.renderMainMenu);
router.route("/paper")
        .get(authorController.retrieveAllPapers);
router.route("/paper/submit")
        .get(authorController.renderCreatePaper)
        .post(authorController.createPaper);
router.route("/paper/update")
        .get(authorController.renderUpdateAllPapers);
router.route("/paper/rate")
        .get(authorController.renderRateAllReviews);

//Register route with params input after the routes without so that the routes can register those first 
router.route("/paper/:id")
        .get(authorController.retrievePaper);
router.route("/paper/update/:id")
        .get(authorController.renderUpdatePaper)
        .post(authorController.updatePaper);
router.route("/paper/rate/:id")
        .get(authorController.renderRateReview)
        .post(authorController.rateReviews);

module.exports = router;