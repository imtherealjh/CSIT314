const express = require("express");
const router = express.Router();
const cchairViewController = require("../controller/cchairViewController");

router.get("/", cchairViewController.renderCCMainMenu);

router.get("/paper", cchairViewController.renderViewPapers);

router.get("/paper/:id", cchairViewController.renderViewPaper);

router.get("/allocate", cchairViewController.renderAllocate);

router.route("/allocate/auto").get(cchairViewController.renderAutoAllocate);

router
  .route("/allocate/manual")
  .get(cchairViewController.renderManualAllocateMain);

router
  .route("/allocate/manual/:id")
  .get(cchairViewController.renderManualAllocate)
  .post(cchairViewController.manualAllocateHandler);

router.route("/re-allocate").get(cchairViewController.renderReallocateMain);

router
  .route("/re-allocate/:id")
  .get(cchairViewController.renderReallocate)
  .post(cchairViewController.reallocateHandler);

router.route("/de-allocate").get(cchairViewController.renderDeallocateMain);

router
  .route("/de-allocate/:id")
  .get(cchairViewController.renderDeallocate)
  .post(cchairViewController.deallocateHandler);

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
