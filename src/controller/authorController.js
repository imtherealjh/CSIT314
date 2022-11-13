const { sequelize } = require("../config/db");

const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");

module.exports = {
  getPaperById: async(id) => {
    return paperEntity.getPaperById(id);
  },
  getPapersByAuthorId: async(userid) => {
    return paperEntity.getPapersByAuthorId(userid);
  },
  createPaper: async (userid, title, paper, coauthors) => {
    const transaction = await sequelize.transaction();
    try {
      let authors = coauthors == undefined ? [] : [...coauthors];
      authors.push(userid);

      const result = await paperEntity.createPaper(title, paper);

      authors = authors.map((e) => {
        return { author_id: Number(e), paper_id: result.paper_id };
      });

      await authorEntity.createLinkToAuthors(authors);
      await transaction.commit();
      return "success";
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      return "error";
    }
  },
  updatePaper: async (userid, id, title, paper, coauthors) => {
    const transaction = await sequelize.transaction();
    try {
      let authors = coauthors == undefined ? [] : [...coauthors];
      authors.push(userid);

      await paperEntity.updatePaper(id, title, paper);
      authors = authors.map((e) => {
        return { author_id: Number(e), paper_id: id };
      });

      await authorEntity.removeLinkFromAuthors(id);
      await authorEntity.createLinkToAuthors(authors);
      await transaction.commit();
      return "success";
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      return "error";
    }
  },
  ratePaper: async (id, rate) => {
    try {
      await paperEntity.ratePaper(id, rate);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
};
