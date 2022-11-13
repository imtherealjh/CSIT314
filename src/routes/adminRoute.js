const express = require("express");
const router = express.Router();
const viewController = require("../controller/adminViewController");

router.get("/", viewController.renderMainMenu);
router.route("/user").get(viewController.renderViewUser);
router
  .route("/user/create")
  .get(viewController.renderCreateUser)
  .post(viewController.createUserHandler);
router.route("/user/update").get(viewController.renderUpdateUserMain);

router.route("/user/profile").get(viewController.renderViewUserProfile);
router
  .route("/user/profile/create")
  .get(viewController.renderCreateUserProfile)
  .post(viewController.createUserProfileHandler);
router
  .route("/user/profile/update")
  .get(viewController.renderUpdateUserProfileMain);

// Register route with params after the all the routes have been registered
router
  .route("/user/update/:id")
  .get(viewController.renderUpdateUser)
  .post(viewController.updateUserHandler);
router
  .route("/user/profile/update/:id")
  .get(viewController.renderUpdateUserProfile)
  .post(viewController.updateUserProfileHandler);

module.exports = router;
