const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Paper extends Model {}

  Paper.init(
    {
      paper_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
          const rawValue = this.getDataValue("paper_id");
          return rawValue ? rawValue : null;
        },
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      paper: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        defaultValue: "Submitted",
      },
      ratings: {
        type: DataTypes.INTEGER(1),
      },
    },
    {
      sequelize,
      modelName: "papers",
      tableName: "papers",
      underscore: true,
      updatedAt: false,
      createdAt: false,
    }
  );

  return Paper
};
