const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const Paper = sequelize.models.papers;
const User = sequelize.models.users;

module.exports = {
  getAllPaper: () => {
    return Paper.findAll();
  },
  getPaperById: (id) => {
    return Paper.findByPk(id);
  },
  getAllSubmittedPapers: () => {
    return Paper.findAll({
      where: {
        approved: {
          [Op.eq]: null
        }
      }
    });
  },
  getPapersByAuthorId: async (author_id) => {
    const users = await User.findByPk(author_id, {
      include: {
        as:"author",
        model: Paper,
        required: true
      },
    });
    //check if users exist and whether author is undefined, if not pass an empty array
    return users?.author ?? [];
  },
  getAuthorsByPaperIds: async (papers) => {
    const storedPapers = await Paper.findAll({
      include: {
        as: "author",
        model: User,
        attributes: ["email"],
      },
      where: {
        paper_id: {
          [Op.in]: papers,
        },
      },
    });
    return storedPapers;
  },
  getReviewersByPaperId : async (id) => {
    const storedPapers = await Paper.findAll({
      include: {
        as: "reviewer",
        model: User
      },
      where: {
        paper_id: id
      },
      raw: true,
      nest: true
    });
    return storedPapers;
  },
  createPaper: (title, paper) => {
    return Paper.create({ title: title, paper: paper }, { raw: true });
  },
  updatePaper: (id, title, paper) => {
    return Paper.update(
      { title: title, paper: paper },
      { where: { paper_id: id } }
    );
  },
  updateApproveStatus: (id, approved, reasons) => {
    return Paper.update(
      { approved: approved, reasons: reasons },
      { where: { paper_id: id } }
    );
  },
  ratePaper: (id, ratings) => {
    return Paper.update({ ratings: ratings }, { where: { paper_id: id } });
  },
};
