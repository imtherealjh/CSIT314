const userEntity = require("../entity/user");
const userProfileEntity = require("../entity/userProfile");
const bcrypt = require("../utils/bcrypt");

module.exports = {
  createUser: async (req, res) => {
    let { name, email, password } = req.body;

    try {
      password = await bcrypt.hashPassword(password);
      result = await userEntity.createUser(name, email, password);
      console.log(result);
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/admin");
  },
  updateUser: async (req, res) => {
    let { name, email, password } = req.body;
    const userObject = await userEntity.getUserById(req.params.id);

    try {
      password =
        password === ""
          ? userObject.password
          : await bcrypt.hashPassword(password);
      await userEntity.updateUser(userObject.user_id, name, email, password);
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/admin");
  },
  createUserProfile: async (req, res) => {
    const { user, role } = req.body;
    try {
      await userProfileEntity.createUserProfile(user, role);
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/admin");
  },
  updateUserProfile: async (req, res) => {
    const { user, role } = req.body;

    try {
      result = await userProfileEntity.updateUserProfile(user, role);
    } catch (err) {
      console.log(err);
      return;
    }

    return res.redirect("/admin");
  },
};
