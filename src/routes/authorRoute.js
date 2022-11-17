const express = require("express");
const router = express.Router();
const viewController = require("../controller/authorViewController");
const adminController = require("../controller/adminController");

router.use(async (req, res, next) => {
  const {userid} = req.session;
  const user = await adminController.getUserProfileById(userid);
  if(user["profile.role_name"] !== "author") {
    return res.redirect("/login");
  }
  next();
});

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
