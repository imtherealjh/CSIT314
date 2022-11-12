const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  class Bids extends Model {}

  Bids.init(
    {
        reviewer_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        paper_id:{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
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
