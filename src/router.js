const express = require("express");
const router = express.Router();

const adminRoute = require("./routes/adminRoute");
const authorRoute = require("./routes/authorRoute");
const reviewerRoute = require("./routes/reviewerRoute");

const userModel = require("./models/adminModel");

const bcrypt = require("./utils/bcrypt");

function getRedirection(role) {
    if(role == "author") {
        return "/author";
    } else if(role == "conference-chair") {
        return "/c-c";
    } else if(role == "admin") {
        return "/admin";
    } else if(role == "reviewer") {
        return "/reviewer";
    } else {
        return "";
    }
}

router.route("/")
    .get((req, res) => res.render("index"))

router.route("/login")
    .get((req, res) => res.render("login", {error:""}))
    .post(async (req, res) => {
        const {email, password} = req.body;
        const result = await userModel.getAllUserDetailsByEmail(email);

        if(typeof(result) === "undefined") {
            return res.render("login", {error:"Account does not match the one in the system"});
        }
        
        matches = await bcrypt.comparePassword(password, result.password);
        if(!matches) {
            return res.render("login", {error:"Account does not match the one in the system"});
        }

        session = req.session;
        session.userid = result.user_id;
        const redirection = getRedirection(result.role_name);
        return res.redirect(redirection);
    });


router.use((req, res, next) => {
    if(!req.session.userid) {
        return res.redirect("/login")
    }
    next();
});

router.use("/admin", adminRoute);
router.use("/author", authorRoute);
router.use("/reviewer", reviewerRoute);

module.exports = router;