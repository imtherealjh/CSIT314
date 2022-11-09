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
    .get((req, res) => {
        res.render("author-rate-review", {
            message: "Aliquet risus feugiat in ante metus dictum. Lobortis feugiat vivamus at augue eget arcu. Varius quam quisque id diam vel quam. Orci a scelerisque purus semper. Ut diam quam nulla porttitor massa id neque aliquam. Nisi est sit amet facilisis magna etiam tempor orci eu. Consectetur libero id faucibus nisl tincidunt eget nullam non. Quam viverra orci sagittis eu volutpat odio. Lacus viverra vitae congue eu consequat ac. Nulla facilisi etiam dignissim diam quis enim. Consectetur adipiscing elit pellentesque habitant morbi. Massa tincidunt dui ut ornare lectus sit amet est placerat. Amet aliquam id diam maecenas ultricies. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Scelerisque purus semper eget duis. Sed tempus urna et pharetra. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Sed ullamcorper morbi tincidunt ornare massa eget."
        })
    })
    .post((req, res) => {
        console.log(req.body)
    });

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

router.use("/admin", adminRoute);
router.use("/author", authorRoute);
router.use("/reviewer", reviewerRoute);

module.exports = router;