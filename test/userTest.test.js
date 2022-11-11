const mathOperations = require("../src/controller/userController");

test("Subtraction of 2 numbers", async () => {
  // arrange and act
  var result = await mathOperations.computeAdd();

  // assert
  expect(result).toBe(12);
});
