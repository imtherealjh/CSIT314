const express = require("express");
const router = express.Router();

const loginRoute = require("./routes/loginRoute")
const adminRoute = require("./routes/adminRoute");
const authorRoute = require("./routes/authorRoute");
const reviewerRoute = require("./routes/reviewerRoute");
const cchairRoute = require("./routes/cchairRoute")

router.use("/", loginRoute)

router.use((req, res, next) => {
    console.log(req.session);
    if(!req.session.userid) {
        return res.redirect("/login")
    }
    next();
});

router.use("/admin", adminRoute);
router.use("/author", authorRoute);
router.use("/reviewer", reviewerRoute);
router.use("/cc", cchairRoute);

module.exports = router;