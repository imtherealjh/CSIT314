const admin = require("../entity/user");
const adminController = require("../controller/adminController");

const { expect } = require("chai");
const sinon = require("sinon");

afterEach(() => {
  sinon.restore();
});

// describe("Registered user", () => {
//   describe("Login", () => {
//     it("should login", async () => {
//       var agent = chai.request.agent()
//     });
//   });
// });

describe("User", () => {
  describe("Testing user functions", () => {
    it("Should get all users", async () => {
      let users = [
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
          name: "c",
          email: "c@c.com",
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
        {
          user_id: 5,
          name: "svdvrvs",
          email: "sadv@vsdfvvsd",
          password:
            "$2b$10$NLdmlttqckt2R8tSMcehb.KH3RGbCADyEjmzkRtHsmU.8oUFldRO6",
          max_no_of_paper: null,
        },
      ];
      const stub = sinon.stub(admin, "getAllUsers").returns(users);
      const result = await adminController.getAllUsers();
      expect(stub.calledOnce).to.be.true;
      expect(result).to.be.an("array");
      expect(result).to.have.members(users);
    });
    it("Should get single users", async () => {
      let user = {
        user_id: 1,
        name: "admin",
        email: "admin@admin.com",
        password:
          "$2b$10$uviBauWRAyeJRPsmrPvj/.R0FZYs4Z6EJRR1KChxMsc.OTdtxwM5S",
        max_no_of_paper: null,
      };
      const stub = sinon.stub(admin, "getUserById").returns(user);
      const result = await adminController.getUserById(user.user_id);
      expect(stub.calledOnce).to.be.true;
      expect(result).to.be.an("object");
      expect(result).to.have.eql(user);
    });

    it("Should create a single user", async () => {
      let user = {
        user_id: 1,
        name: "admin",
        email: "admin@admin.com",
        password:
          "$2b$10$uviBauWRAyeJRPsmrPvj/.R0FZYs4Z6EJRR1KChxMsc.OTdtxwM5S",
        max_no_of_paper: null,
      };
      const stub = sinon.stub(admin, "createUser").returns(user);
      const result = await adminController.createUser(user.name, user.email,"");
      expect(stub.calledOnce).to.be.true;
      expect(result).to.be.eq("success");
      const userObj = await adminController.getUserById(user.user_id);
      expect(userObj).to.be.eql(userObj);
    });
  });
});
