const userEntity = require("../entity/user");
const userController = require("../controller/adminController");
const userProfileEntity = require("../entity/userProfile");
const { sequelize } = require("../config/db");

import { expect, jest, test } from "@jest/globals";
import bcrypt from "../utils/bcrypt";

async function initializeDatabase() {
  await sequelize.sync({ force: true });
  let users = [
    {
      user_id: 1,
      name: "admin",
      email: "admin@admin.com",
      password: "$2b$10$uviBauWRAyeJRPsmrPvj/.R0FZYs4Z6EJRR1KChxMsc.OTdtxwM5S",
      max_no_of_paper: null,
    },
    {
      user_id: 2,
      name: "cchair",
      email: "cchair@cchair.com",
      password: "$2b$10$PL0SPGBQbWKzmEZDVtG3ieNckfH7XSdd3yPTLsW70ljF5P15DZ9pu",
      max_no_of_paper: null,
    },
    {
      user_id: 3,
      name: "author",
      email: "author@author.com",
      password: "$2b$10$qVpqTymZCySESnaeQwMfMeUQ0YWAEF8ZigAD8X8egA2EvBryDC8RS",
      max_no_of_paper: null,
    },
    {
      user_id: 4,
      name: "reviewer",
      email: "review@review.com",
      password: "$2b$10$dqsWbXa0PjkTiAl2YxOY4...8ksmlXL.CDNjbShaoRzw5QLPzMH02",
      max_no_of_paper: null,
    },
  ];

  const user = sequelize.models.users;
  await user.bulkCreate(users);

  let usersProfile = [
    {
      user_id: 1,
      role_name: "admin",
    },
    {
      user_id: 2,
      role_name: "conference-chair",
    },
    {
      user_id: 3,
      role_name: "author",
    }
  ];

  const users_profile = sequelize.models.users_profile;
  await users_profile.bulkCreate(usersProfile);
}

beforeAll(async () => {
  return await initializeDatabase();
});

afterAll(async () => {
  return await sequelize.sync({ force: true });
});

describe("User", () => {
  describe("Testing user functions", () => {
    it("Should get all users", async () => {
      const spy = jest.spyOn(userEntity, "getAllUsers");
      const result = await userController.getAllUsers();
      expect(spy).toBeCalledTimes(1);
      expect(result).toStrictEqual([
        {
          user_id: 1,
          name: "admin",
          email: "admin@admin.com",
          password:
            "$2b$10$uviBauWRAyeJRPsmrPvj/.R0FZYs4Z6EJRR1KChxMsc.OTdtxwM5S",
          max_no_of_paper: null,
        },
        {
          user_id: 2,
          name: "cchair",
          email: "cchair@cchair.com",
          password:
            "$2b$10$PL0SPGBQbWKzmEZDVtG3ieNckfH7XSdd3yPTLsW70ljF5P15DZ9pu",
          max_no_of_paper: null,
        },
        {
          user_id: 3,
          name: "author",
          email: "author@author.com",
          password:
            "$2b$10$qVpqTymZCySESnaeQwMfMeUQ0YWAEF8ZigAD8X8egA2EvBryDC8RS",
          max_no_of_paper: null,
        },
        {
          user_id: 4,
          name: "reviewer",
          email: "review@review.com",
          password:
            "$2b$10$dqsWbXa0PjkTiAl2YxOY4...8ksmlXL.CDNjbShaoRzw5QLPzMH02",
          max_no_of_paper: null,
        },
      ]);
    });
    it("Should get user by id", async () => {
      const spy = jest.spyOn(userEntity, "getUserById");
      const result = await userController.getUserById(1);
      expect(spy).toBeCalledTimes(1);
      const myObj = JSON.parse(JSON.stringify(result));
      expect(myObj).toEqual({
        user_id: 1,
        name: "admin",
        email: "admin@admin.com",
        password:
          "$2b$10$uviBauWRAyeJRPsmrPvj/.R0FZYs4Z6EJRR1KChxMsc.OTdtxwM5S",
        max_no_of_paper: null,
      });
    });

    it("Should create single user", async () => {
      const userToInsert = {
        user_id: 5,
        name: "myReview",
        email: "myReview@myReview.com",
        max_no_of_paper: null,
      };

      const spy = jest.spyOn(userEntity, "createUser");
      await userController.createUser(
        "myReview",
        "myReview@myReview.com",
        "jeff"
      );
      expect(spy).toBeCalledTimes(1);
      const user = await userController.getUserById(5);

      const myObj = JSON.parse(JSON.stringify(user));
      const password = myObj.password;

      const matches = await bcrypt.comparePassword("jeff", password);
      expect(matches).toBe(true);

      delete myObj.password;
      expect(myObj).toStrictEqual(userToInsert);
    });

    it("Should update single user", async () => {
      const userToUpdate = {
        user_id: 5,
        name: "myReview",
        email: "myReview@myReview.com",
        max_no_of_paper: null,
      };

      const spy = jest.spyOn(userEntity, "updateUser");
      userToUpdate.name = "myNameJeff";
      const result = await userController.updateUser(
        userToUpdate.user_id,
        userToUpdate.name,
        userToUpdate.email,
        "jeff"
      );

      expect(spy).toBeCalledTimes(1);
      expect(result).toBe("success");
      const user = await userController.getUserById(5);

      const myObj = JSON.parse(JSON.stringify(user));
      const password = myObj.password;

      const matches = await bcrypt.comparePassword("jeff", password);
      expect(matches).toBe(true);

      delete myObj.password;
      expect(myObj).toStrictEqual(userToUpdate);
    });
  });
});

describe("User Profile", () => {
  describe("Testing user profile functions", () => {
    it("Should get all users profile", async () => {
      const spy = jest.spyOn(userProfileEntity, "getUserProfiles");
      const result = await userController.getUserProfiles();
      expect(spy).toBeCalledTimes(1);
      expect(result).toStrictEqual([
        {
          user_id: 1,
          role_name: "admin",
          name: "admin",
          "profile.user_id": 1,
          "profile.role_name": "admin",
        },
        {
          user_id: 2,
          role_name: "conference-chair",
          name: "cchair",
          "profile.user_id": 2,
          "profile.role_name": "conference-chair",
        },
        {
          user_id: 3,
          role_name: "author",
          name: "author",
          "profile.user_id": 3,
          "profile.role_name": "author",
        }
      ]);
    });

    it("Should get single users profile", async () => {
      const spy = jest.spyOn(userProfileEntity, "getUserProfileById");
      const result = await userController.getUserProfileById(3);
      const userProfileObj = JSON.parse(JSON.stringify(result));
      expect(spy).toBeCalledTimes(1);
      expect(userProfileObj).toStrictEqual({
        user_id: 3,
        role_name: "author",
        name: "author",
        "profile.user_id": 3,
        "profile.role_name": "author",
      });
    });

    it("Should create single users profile", async () => {
      const spy = jest.spyOn(userProfileEntity, "createUserProfile");
      const result = await userController.createUserProfile(4, "reviewer");
      
      expect(spy).toBeCalledTimes(1);
      expect(result).toBe("success");
  
      const obj = await userController.getUserProfileById(4);
      expect(obj).toStrictEqual({
        user_id: 4,
        role_name: "reviewer",
        name: "reviewer",
        "profile.user_id": 4,
        "profile.role_name": "reviewer",
      });
    });
  
    it("Should update single users profile", async () => {
      const spy = jest.spyOn(userProfileEntity, "updateUserProfile");
      await userController.updateUserProfile(4, "conference-chair");
      
      expect(spy).toBeCalledTimes(1);
  
      const obj = await userController.getUserProfileById(4);
      expect(obj).toStrictEqual({
        user_id: 4,
        role_name: "conference-chair",
        name: "reviewer",
        "profile.user_id": 4,
        "profile.role_name": "conference-chair",
      });
    });
  });
});