const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Reviews extends Model {}

  Reviews.init(
    {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reviews : {
            type: DataTypes.TEXT
        },
        ratings : {
            type: DataTypes.INTEGER
        }
    },
    {
      sequelize,
      modelName: "reviews",
      tableName: "reviews",
      underscore: true,
      updatedAt: false,
      createdAt: false
    }
  );

  return Reviews
};
