const userEntity = require("../entity/user");
const userProfileEntity = require("../entity/userProfile");
const bcrypt = require("../utils/bcrypt");

module.exports = {
  getAllUsers: async() => {
    return userEntity.getAllUsers();
  },
  getUserById: async(id) => {
    return userEntity.getUserById(id);
  },
  createUser: async (name, email, password) => {
    try {
      password = await bcrypt.hashPassword(password);
      result = await userEntity.createUser(name, email, password);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  updateUser: async (id, name, email, password) => {
    try {
      const userObject = await userEntity.getUserById(id);
      password =
        password === ""
          ? userObject.password
          : await bcrypt.hashPassword(password);
      await userEntity.updateUser(userObject.user_id, name, email, password);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  getUserProfiles: async() => {
    return userProfileEntity.getUserProfiles();
  },
  getUserProfileById: async(id) => {
    return userProfileEntity.getUserProfileById(id);
  },
  createUserProfile: async (user, role) => {
    try {
      await userProfileEntity.createUserProfile(user, role);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  updateUserProfile: async (user, role) => {
    try {
      result = await userProfileEntity.updateUserProfile(user, role);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
};
