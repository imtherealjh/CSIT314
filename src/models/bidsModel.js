const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Bids extends Model {}

  Bids.init(
    {
        successful: {
            type: DataTypes.BOOLEAN
        },
    },
    {
      sequelize,
      modelName: "bids",
      tableName: "bids",
      underscore: true,
      updatedAt: false,
      createdAt: true
    }
  );

  return Bids;
};
