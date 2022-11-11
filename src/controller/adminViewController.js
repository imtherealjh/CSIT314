const adminModel = require("../models/userModel");
const userProfileModel = require("../models/userProfileModel")

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("admin-main-menu");
    },
    renderCreateUser: (req, res) => {
        return res.render("create-update-user", {
            title: "Create User",
            name: "",
            email: "",
        });
    },
    renderViewUser: async (req, res) => {
        const rows = await adminModel.getAllUserDetails();
        return res.render("view-users", {
            title: "View Users",
            data: rows,
        });
    },
    renderUpdateUserMain: async (req, res) => {
        const rows = await adminModel.getAllUserDetails();
        return res.render("view-users", {
            title: "Update Users",
            link: "/admin/user/update",
            data: rows,
        });
    },
    renderUpdateUser: async (req, res) => {
        //get data and render on page
        const user = await adminModel.getUserById(req.params.id);
        return res.render("create-update-user", {
            title: "Update Users",
            name: user.name,
            email: user.email,
        });
    },
    renderCreateUserProfile: async (req, res) => {
        const rows = await adminModel.getUserWithoutProfile();
        return res.render("create-update-user-profile", {
            title: "Create User Profile",
            data: rows,
        });
    },
    renderViewUserProfile: async (req, res) => {
        const rows = await userProfileModel.getUserProfiles();
        
        return res.render("view-user-profile", {
            title: "View User Profile",
            data: rows,
        });
    },
    renderUpdateUserProfileMain: async (req, res) => {
        const rows = await userProfileModel.getUserProfiles();
        return res.render("view-user-profile", {
            title: "Update User Profile",
            link: "/admin/user/profile/update",
            data: rows,
        });
    },
    renderUpdateUserProfile: async (req, res) => {
        const {id} = req.params
        const obj = await userProfileModel.getUserProfileById(id);
        const rows = [obj]
        return res.render("create-update-user-profile", {
            title: "Update User Profile",
            data: rows,
        });
    }
};
