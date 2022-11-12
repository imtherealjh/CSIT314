const { Model } = require("sequelize");

module.exports = (sequelize) => {
  class Author extends Model {}

  Author.init(
    {},
    {
      sequelize,
      modelName: "authors",
      tableName: "authors",
      underscore: true,
      updatedAt: false,
      createdAt: false
    }
  );

  return Author
};
