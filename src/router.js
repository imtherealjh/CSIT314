const express = require("express");
const router = express.Router();

const userRoute = require("./routes/userRoute");
const authorRoute = require("./routes/authorRoute");
const reviewerRoute = require("./routes/reviewerRoute");

const userModel = require("./models/userModel");

router.route("/")
    .get((req, res) => {
        res.render("author-rate-review", {
            message: "Aliquet risus feugiat in ante metus dictum. Lobortis feugiat vivamus at augue eget arcu. Varius quam quisque id diam vel quam. Orci a scelerisque purus semper. Ut diam quam nulla porttitor massa id neque aliquam. Nisi est sit amet facilisis magna etiam tempor orci eu. Consectetur libero id faucibus nisl tincidunt eget nullam non. Quam viverra orci sagittis eu volutpat odio. Lacus viverra vitae congue eu consequat ac. Nulla facilisi etiam dignissim diam quis enim. Consectetur adipiscing elit pellentesque habitant morbi. Massa tincidunt dui ut ornare lectus sit amet est placerat. Amet aliquam id diam maecenas ultricies. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Scelerisque purus semper eget duis. Sed tempus urna et pharetra. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Sed ullamcorper morbi tincidunt ornare massa eget."
        })
    })
    .post((req, res) => {
        console.log(req.body)
    });

router.get("/admin/create/user/profile", (req, res) => {
    const jsonArray = [{"username": "abc"}]
    res.render("create-update-user-profile", {
        "title": "Create User Profile",
        user: jsonArray
    });
});

router.get("/admin/create/user", (req, res) => {
    res.render("create-update-user" , {
        "title": "Create User",
        "name": "",
        "email": "",
        "password": ""
    });
});

comparePassword = async (password, hash) => {
    const bcrypt = require('bcrypt');
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, result) {
            if(err) return reject(err);
            return resolve(result)
        })
    });
};

router.route("/login")
    .get((req, res) => res.render("login", {error:""}))
    .post(async (req, res) => {
        const {email, password} = req.body;
        let result = await userModel.getUserByEmail(email);

        const match = await comparePassword(password, result['password']);
        if(!match) {
            res.render("login", {error:"Account does not match the one in the system"});
        }

        
    });

router.use("/user", userRoute);
router.use("/author", authorRoute);
router.use("/reviewer", reviewerRoute);

module.exports = router;