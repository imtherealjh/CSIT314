const userEntity = require("../entity/user");
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
    const result = await adminController.createUser(name, email, password);
    if (result == "success") {
      return res.render("success", { link: "/admin" });
    } else {
      return res.render("error", { link: "/admin" });
    }
  },
  renderViewUser: async (req, res) => {
    const rows = await adminController.getAllUsers();
    return res.render("view-users", {
      title: "View Users",
      data: rows,
    });
  },
  renderUpdateUserMain: async (req, res) => {
    const rows = await adminController.getAllUsers();
    return res.render("view-users", {
      title: "Update Users",
      link: "/admin/user/update",
      data: rows,
    });
  },
  renderUpdateUser: async (req, res) => {
    //get data and render on page
    const { id } = req.params;
    const user = await adminController.getUserById(id);
    return res.render("create-update-user", {
      title: "Update Users",
      name: user.name,
      email: user.email,
    });
  },
  updateUserHandler: async (req, res) => {
    const { id } = req.params;
    let { name, email, password } = req.body;
    const result = await adminController.updateUser(id, name, email, password);
    if (result == "success") {
      return res.render("success", { link: "/admin" });
    } else {
      return res.render("error", { link: "/admin" });
    }
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
    const result = await adminController.createUserProfile(user, role);
    if (result == "success") {
      return res.render("success", { link: "/admin" });
    } else {
      return res.render("error", { link: "/admin" });
    }
  },
  renderViewUserProfile: async (req, res) => {
    const rows = await adminController.getUserProfiles();
    return res.render("view-user-profile", {
      title: "View User Profile",
      data: rows,
    });
  },
  renderUpdateUserProfileMain: async (req, res) => {
    const rows = await adminController.getUserProfiles();
    return res.render("view-user-profile", {
      title: "Update User Profile",
      link: "/admin/user/profile/update",
      data: rows,
    });
  },
  renderUpdateUserProfile: async (req, res) => {
    const { id } = req.params;
    const obj = await adminController.getUserProfileById(id);
    const rows = [obj];
    return res.render("create-update-user-profile", {
      title: "Update User Profile",
      data: rows,
    });
  },
  updateUserProfileHandler: async (req, res) => {
    const { user, role } = req.body;
    const result = await adminController.updateUserProfile(user, role);
    if (result == "success") {
      return res.render("success", { link: "/admin" });
    } else {
      return res.render("error", { link: "/admin" });
    }
  },
};
