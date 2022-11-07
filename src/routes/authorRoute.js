const express = require("express");
const router = express.Router();
const authorController = require('../controller/authorController')

router.get("/", authorController.renderMainMenu);
router.route("/paper")
        .get(authorController.retrieveAllPapers)
router.route("/paper/:id")
        .get(authorController.retrievePaper)
router.route("/paper/submit")
        .get(authorController.renderCreatePaper)
        .post(authorController.createPaper)
router.route("/paper/update")
        .get(authorController.renderUpdateAllPapers)
router.route("/paper/update/:id")
        .get(authorController.renderUpdate)
        .put(authorController.updatePaper)

module.exports = router;