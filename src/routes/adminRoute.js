const express = require("express");
const router = express.Router();
const viewController = require("../controller/adminViewController");
const adminController = require("../controller/adminController");

router.use(async (req, res, next) => {
  const {userid} = req.session;
  const user = await adminController.getUserProfileById(userid);
  if(user["profile.role_name"] !== "admin") {
    return res.redirect("/login");
  }
  next();
});

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
