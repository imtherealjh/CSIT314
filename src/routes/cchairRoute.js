const express = require("express");
const router = express.Router();
const cchairViewController = require("../controller/cchairViewController");
const cchairController = require("../controller/cchairController");

router.get("/", cchairViewController.renderCCMainMenu);

router.get("/allocate", cchairViewController.renderAllocate);

router
  .route("/allocate/auto")
  .get(cchairViewController.renderAutoAllocate)
  .post(cchairController.autoAllocateReviewers);

router
  .route("/allocate/view-papers")
  .get(cchairViewController.renderManualAllocateMain);

router.route("/allocate/manual");

router.route("/approve").get(cchairViewController.renderApproveMain);

router
  .route("/approve/:id")
  .get(cchairViewController.renderApprovePaper)
  .post(cchairViewController.approvePaperHandler);

router
  .route("/notify")
  .get(cchairViewController.renderNotifyUser)
  .post(cchairViewController.notifyUserHandler);

module.exports = router;
