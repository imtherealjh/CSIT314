const express = require("express");
const router = express.Router();
let reviewerController = require("../controller/reviewerController")

router.get("/", reviewerController.renderMainMenu);
router.route("/bids/submit")
        .get(reviewerController.renderSubmitBids)
        .post(reviewerController.submitBids)
router.route("/bids/remove")
        .get(reviewerController.renderRemoveBids)
        .post(reviewerController.removeBids)
router.route("/specify/max-no-of-paper")
        .get(reviewerController.renderMaxNoOfPaper)
        .post(reviewerController.updateMaxNoOfPaper)

module.exports = router;