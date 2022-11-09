const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const viewController = require("../controller/adminViewController");

router.get("/", viewController.renderMainMenu);
router.route("/user")
        .get(viewController.renderViewUser);
router.route("/user/create")
        .get(viewController.renderCreateUser)
        .post(adminController.createUser);
router.route("/user/update")
        .get(viewController.renderUpdateUserMain);
        
router.route("/user/profile")
        .get(viewController.renderViewUserProfile);
router.route("/user/profile/create")
        .get(viewController.renderCreateUserProfile)
        .post(adminController.createUserProfile);
router.route("/user/profile/update")
        .get(viewController.renderUpdateUserProfileMain);

// Register route with params after the all the routes have been registered
router.route("/user/update/:id")
        .get(viewController.renderUpdateUser)
        .post(adminController.updateUser);
router.route("/user/profile/update/:id")
        .get(viewController.renderUpdateUserProfile)
        .post(adminController.updateUserProfile)


module.exports = router;