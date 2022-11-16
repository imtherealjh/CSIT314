const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.route("/").get((req, res) => res.render("index"));

router
  .route("/login")
  .get((req, res) => res.render("login", { error: "" }))
  .post(loginController.verifyLogin);

router.route("/logout").post(loginController.logout);

module.exports = router;
