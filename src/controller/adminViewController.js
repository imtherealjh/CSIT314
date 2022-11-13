const userEntity = require("../entity/user");
const userProfileEntity = require("../entity/userProfile");
const adminController = require("./adminController");

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
  createUserHandler: async (req, res) => {
    let { name, email, password } = req.body;
    const result = adminController.createUser(name, email, password);
    return res.redirect("/admin");
  },
  renderViewUser: async (req, res) => {
    const rows = await userEntity.getAllUser();
    return res.render("view-users", {
      title: "View Users",
      data: rows,
    });
  },
  renderUpdateUserMain: async (req, res) => {
    const rows = await userEntity.getAllUser();
    return res.render("view-users", {
      title: "Update Users",
      link: "/admin/user/update",
      data: rows,
    });
  },
  renderUpdateUser: async (req, res) => {
    //get data and render on page
    const user = await userEntity.getUserById(req.params.id);
    return res.render("create-update-user", {
      title: "Update Users",
      name: user.name,
      email: user.email,
    });
  },
  updateUserHandler: async (req, res) => {
    let { name, email, password } = req.body;
    const result = adminController.updateUser(name, email, password);
    return res.redirect("/admin");
  },
  renderCreateUserProfile: async (req, res) => {
    const rows = await userEntity.getUserWithoutProfile();
    return res.render("create-update-user-profile", {
      title: "Create User Profile",
      data: rows,
    });
  },
  createUserProfileHandler: async (req, res) => {
    const { user, role } = req.body;
    const result = adminController.createUserProfile(user, role);
    return res.redirect("/admin");
  },
  renderViewUserProfile: async (req, res) => {
    const rows = await userProfileEntity.getUserProfiles();
    return res.render("view-user-profile", {
      title: "View User Profile",
      data: rows,
    });
  },
  renderUpdateUserProfileMain: async (req, res) => {
    const rows = await userProfileEntity.getUserProfiles();
    return res.render("view-user-profile", {
      title: "Update User Profile",
      link: "/admin/user/profile/update",
      data: rows,
    });
  },
  renderUpdateUserProfile: async (req, res) => {
    const { id } = req.params;
    const obj = await userProfileEntity.getUserProfileById(id);
    const rows = [obj];
    return res.render("create-update-user-profile", {
      title: "Update User Profile",
      data: rows,
    });
  },
  updateUserProfileHandler : async (req, res) => {
    const { user, role } = req.body;
    const result = adminController.updateUserProfile(user, role);
    return res.redirect("/admin");
  },
};
