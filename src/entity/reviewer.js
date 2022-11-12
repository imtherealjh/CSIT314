const { sequelize } = require("../config/db");

const User = sequelize.models.users;
const Bids = sequelize.models.bids;

module.exports = {
  getMaxNoOfPaper: async (reviewer_id) => {
    return User.findByPk(reviewer_id, {
      attributes: ["max_no_of_paper"],
    });
  },
  updateMaxNoOfPaper: (reviewer_id, max_no_of_paper) => {
    return User.update(
      { max_no_of_paper: max_no_of_paper },
      {
        where: {
          user_id: reviewer_id,
        },
      }
    );
  },
  createBids: (bids) => {
    return Bids.create(bids[0], {raw: true});
  },
};
