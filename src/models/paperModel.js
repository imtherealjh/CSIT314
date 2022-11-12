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
        get() {
          const rawValue = this.getDataValue("title");
          return rawValue ? rawValue : null;
        },
      },
      paper: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("paper");
          return rawValue ? rawValue : null;
        },
      },
      status: {
        type: DataTypes.STRING(45),
        defaultValue: "Submitted",
        get() {
          const rawValue = this.getDataValue("status");
          return rawValue ? rawValue : null;
        },
      },
      ratings: {
        type: DataTypes.INTEGER(1),
      },
      approved: {
        type: DataTypes.BOOLEAN,
        get() {
            const rawValue = this.getDataValue("approved");
            return rawValue? rawValue : null;
        }
      }, 
      reasons: {
        type: DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue("reasons");
            return rawValue? rawValue : null;
        }
      }
    },
    {
      sequelize,
      modelName: "papers",
      tableName: "papers",
      underscore: true,
      updatedAt: false,
      createdAt: false
    }
  );

  return Paper;
};
