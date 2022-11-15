const admin = require("../entity/user");
const adminController = require("../controller/adminController");
const { sequelize } = require("../config/db");

import { expect, jest, test } from "@jest/globals";

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
    },
    {
      user_id: 4,
      role_name: "reviewer",
    },
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
      const spy = jest.spyOn(admin, "getAllUsers");
      const result = await adminController.getAllUsers();
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
      const spy = jest.spyOn(admin, "getUserById");
      const result = await adminController.getUserById(1);
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
        password:
          "$2b$10$xV8odMOMgrzgMFsjjGiflOYuChV5qkfAowvdvH0peehzBYMZi8IBG",
        max_no_of_paper: null,
      };
      
      const spy = jest.spyOn(admin, "createUser");
      const result = await adminController.createUser("myReview", "myReview@myReview.com", "jeff");
      expect(spy).toBeCalledTimes(1);
      console.log(result);
      //expect(result).toBe("success");
      const user = await adminController.getUserById(5);
      expect(user).toBe(userToInsert);
    });
  });
});
