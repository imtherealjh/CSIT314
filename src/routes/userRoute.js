const express = require("express");
const router = express.Router();
let userController = require("../controller/userController")

router.get('/', userController.computeAdd);

module.exports = router;