const express = require("express");
const router = express.Router();
const viewController = require("../controller/cchairViewController");

router.get("/", viewController.renderCCMainMenu);

router.get("/paper", viewController.renderViewPapers);

router.get("/paper/:id", viewController.renderViewPaper);

router.get("/allocate", viewController.renderAllocate);

router
  .route("/allocate/auto")
  .get(viewController.renderAutoAllocate)
  .post(viewController.autoAllocateHandler);

router.route("/allocate/manual").get(viewController.renderManualAllocateMain);

router
  .route("/allocate/manual/:id")
  .get(viewController.renderManualAllocate)
  .post(viewController.manualAllocateHandler);

router.route("/re-allocate").get(viewController.renderReallocateMain);

router
  .route("/re-allocate/:id")
  .get(viewController.renderReallocate)
  .post(viewController.reallocateHandler);

router.route("/de-allocate").get(viewController.renderDeallocateMain);

router
  .route("/de-allocate/:id")
  .get(viewController.renderDeallocate)
  .post(viewController.deallocateHandler);

router.route("/approve").get(viewController.renderApproveMain);

router
  .route("/approve/:id")
  .get(viewController.renderApprovePaper)
  .post(viewController.approvePaperHandler);

router
  .route("/notify")
  .get(viewController.renderNotifyUser)
  .post(viewController.notifyUserHandler);

module.exports = router;
