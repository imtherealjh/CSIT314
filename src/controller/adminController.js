const adminModel = require("../models/adminModel");
const reviewerModel = require("../models/reviewerModel");
const {connection, transaction} = require("../config/db");
const bcrypt = require("../utils/bcrypt");

module.exports = {
    createUser: async (req, res) => {
        let { name, email, password } = req.body;

        try {
            password = await bcrypt.hashPassword(password);
            result = await adminModel.createUser(name, email, password);
        } catch (err) {
            console.log(err);
            return;
        }
        return res.redirect("/admin");
    },
    updateUser: async (req, res) => {
        let { name, email, password } = req.body;
        const userObject = await adminModel.getUserById(req.params.id);

        try {
            password = password === "" ? userObject.password : await bcrypt.hashPassword(password);
            result = await adminModel.updateUser(userObject.user_id, name, email, password);
        } catch (err) {
            console.log(err);
            return;
        }
        return res.redirect("/admin");
    },
    createUserProfile: async (req, res) => {
        const { user, role } = req.body;

        await transaction();
        try {
            await adminModel.createUserProfile(user, role);
            if (role == "reviewer") {
                await reviewerModel.createMaxNoOfPaper(user);
            }
            connection.commit();
        } catch (err) {
            connection.rollback();
            console.log(err);
            return;
        }
        return res.redirect("/admin");
    },
    updateUserProfile: async (req, res) => {
        const { user, role } = req.body;

        try {
            const rows = await adminModel.getReviewersById(user);
            if(!rows) {
                result = await Promise.all([adminModel.updateUserProfile(user, role), 
                                            reviewerModel.createMaxNoOfPaper(user)]);
            } else {
                result = await adminModel.updateUserProfile(user, role);
            }
        } catch (err) {
            console.log(err);
            return;
        }
        
        return res.redirect("/admin");
    }
};
