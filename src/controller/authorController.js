const { sequelize } = require("../config/db");

const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");

module.exports = {
  createPaper: async (req, res) => {
    const { userid } = req.session;
    let { title, paper, coauthors } = req.body;

    const transaction = await sequelize.transaction();
    try {
        console.log(coauthors);
      let authors = coauthors == undefined ? [] : [...coauthors];
      authors.push(userid);

      console.log(authors);

      const result = await paperEntity.createPaper(title, paper);

      authors = authors.map((e) => {
        return { author_id: Number(e), paper_id: result.paper_id };
      });

      await authorEntity.createLinkToAuthors(authors);
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      return;
    }

    return res.redirect("/author");
  },
  retrievePaper: async (req, res) => {
    const { id } = req.params;
    const storedPaper = await paperEntity.getPaperById(id);
    const { title, paper, status } = storedPaper;
    return res.render("view-single-paper-main", {
      titleOfPaper: title,
      paper: paper,
      status: status,
    });
  },
  updatePaper: async (req, res) => {
    const { userid } = req.session;
    const { id } = req.params;
    let { title, paper, coauthors } = req.body;

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
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      return;
    }

    return res.redirect("/author");
  },
  ratePaper: async (req, res) => {
    const { rate } = req.body;
    const { id } = req.params;

    try {
      await paperEntity.ratePaper(id, rate);
    } catch (err) {
      console.log(err);
      return;
    }
    return res.redirect("/author");
  },
};
