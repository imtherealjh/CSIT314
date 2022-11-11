const adminModel = require("../models/userModel");
const profileModel = require("../models/userProfileModel")
const reviewerModel = require("../models/reviewerModel");
const {sequelize} = require("../config/db");
const bcrypt = require("../utils/bcrypt");

module.exports = {
    createUser: async (req, res) => {
        let { name, email, password } = req.body;

        try {
            password = await bcrypt.hashPassword(password);
            result = await adminModel.createUser(name, email, password);
            console.log(result);
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
            await adminModel.updateUser(userObject.user_id, name, email, password);
        } catch (err) {
            console.log(err);
            return;
        }
        return res.redirect("/admin");
    },
    createUserProfile: async (req, res) => {
        const { user, role } = req.body;

        const transaction = await sequelize.transaction()
        try {
            await profileModel.createUserProfile(user, role);
            
            if (role == "reviewer") {
                await reviewerModel.createMaxNoOfPaper(user);
            }
            await transaction.commit()
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            return;
        }
        return res.redirect("/admin");
    },
    updateUserProfile: async (req, res) => {
        const { user, role } = req.body;

        try {
            result = await profileModel.updateUserProfile(user, role);
            /*
            if(!rows) {
                result = await Promise.all([profileModel.updateUserProfile(user, role), 
                                            reviewerModel.createMaxNoOfPaper(user)]);
            } else {
                
            }*/
        } catch (err) {
            console.log(err);
            return;
        }
        
        return res.redirect("/admin");
    }
};
