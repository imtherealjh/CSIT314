const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserProfile extends Model {}

  UserProfile.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: sequelize.models.users,
          key: "user_id",
        },
      },
      role_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("role_name");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
    },
    {
      sequelize,
      modelName: "users_profile",
      tableName: "users_profile",
      underscore: true,
      updatedAt: false,
      createdAt: false
    }
  );

  return UserProfile
};
