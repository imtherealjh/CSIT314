const express = require("express");
const router = express.Router();

const userRoute = require("./routes/userRoute");

const userModel = require("./models/userModel");

router.get("/", (req, res) => {
    res.render("author-submit-paper");
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

module.exports = router;