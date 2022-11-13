const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
          const rawValue = this.getDataValue("user_id");
          return rawValue ? rawValue : 0;
        },
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("name");
          return rawValue ? rawValue : null;
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email has already been registered..." },
        get() {
          const rawValue = this.getDataValue("email");
          return rawValue ? rawValue : null;
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_no_of_paper: {
        type: DataTypes.INTEGER(3),
        get() {
          const rawValue = this.getDataValue("max_no_of_paper");
          return rawValue ? rawValue : null;
        },
      },
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
      underscore: true,
      updatedAt: false,
      createdAt: false,
    }
  );

  return User;
};
