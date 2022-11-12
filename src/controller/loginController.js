const userModel = require("../entity/user");
const bcrypt = require("../utils/bcrypt");

function getRedirection(role) {
    if(role == "author") {
        return "/author";
    } else if(role == "conference-chair") {
        return "/cc";
    } else if(role == "admin") {
        return "/admin";
    } else if(role == "reviewer") {
        return "/reviewer";
    } else {
        return "";
    }
}

module.exports = {
    loginUser: async (req, res) => {
        const {email, password} = req.body;
        if(email == "") {
            return res.render("login", {error:"Please provide both an email and password"});
        }

        const result = await userModel.getUserByEmail(email);
        if(typeof result == "undefined" || result == null) {
            return res.render("login", {error:"Account does not match the one in the system"});
        }

        matches = await bcrypt.comparePassword(password, result.password);
        if(!matches) {
            return res.render("login", {error:"Account does not match the one in the system"});
        }

        session = req.session;
        session.userid = result.user_id;
        const redirection = getRedirection(result["profile.role_name"]);
        return res.redirect(redirection);
    },
    logoutUser: async (req, res) => {
        req.session.destroy((err) => {
            if(err) return;
            return res.redirect("/");
        });
    }
}