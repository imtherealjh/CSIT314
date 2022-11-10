const adminModel = require("../models/adminModel");

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
        const rows = await adminModel.getUserDetailsById(req.params.id);
        //to access the first data of the sql query
        const data = rows[0];
        return res.render("create-update-user", {
            title: "Update Users        ",
            name: data.name,
            email: data.email,
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
        const rows = await adminModel.getUserProfiles();
        return res.render("view-user-profile", {
            title: "View User Profile",
            data: rows,
        });
    },
    renderUpdateUserProfileMain: async (req, res) => {
        const rows = await adminModel.getUserProfiles();
        return res.render("view-user-profile", {
            title: "Update User Profile",
            link: "/admin/user/profile/update",
            data: rows,
        });
    },
    renderUpdateUserProfile: async (req, res) => {
        const rows = await adminModel.getUserProfileById(req.params.id);
        return res.render("create-update-user-profile", {
            title: "Update User Profile",
            data: rows,
        });
    }
};
