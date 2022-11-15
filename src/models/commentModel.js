const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Comments extends Model {}

  Comments.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments : {
            type: DataTypes.TEXT
        }
    },
    {
      sequelize,
      modelName: "comments",
      tableName: "comments",
      underscore: true,
      updatedAt: false,
      createdAt: false
    }
  );

  return Comments
};
