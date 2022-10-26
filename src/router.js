const express = require("express");
const router = express.Router();

const userRoute = require("./routes/userRoute");

router.get("/", (req, res) => {
    res.send("Index page");
});

router.use("/user", userRoute);


module.exports = router;