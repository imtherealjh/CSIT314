const db = require("../config/db");
const sequelize = db.sequelize;

const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");

module.exports = {
    createPaper: async (req, res) => {
        const { userid } = req.session; 
        let { title, paper, coauthors } = req.body;

        const transaction = await sequelize.transaction();
        try {
            coauthors = coauthors ?? [userid];
            coauthors = typeof(coauthors) == "string" ? [coauthors, userid] : coauthors;
            const result = await paperEntity.createPaper(title, paper);

            coauthors = coauthors.map((e) => {
                return {author_id: e, paper_id: result.paper_id};
            });

            await authorEntity.createLinkToAuthors(coauthors);
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            console.log(e);
            return;
        };

        return res.redirect("/author");
    },
    retrievePaper: async (req, res) => {
        const {id} = req.params;
        const paper = await paperEntity.getPaperById(id);
        console.log(paper);
        return res.render("view-single-paper-main");
    },
    updatePaper: async (req, res) => {
        const { userid } = req.session; 
        const { id } = req.params
        let { title, paper, coauthors } = req.body;

        const transaction = await sequelize.transaction();
        try {
            coauthors = coauthors ?? [userid];
            coauthors = typeof(coauthors) == "string" ? [coauthors, userid] : coauthors;

            const result = await paperEntity.updatePaper(id, title, paper);
            const paper_id = result[0];
            coauthors = coauthors.map((e) => {
                return {author_id: e, paper_id: paper_id};
            });

            await authorEntity.removeLinkFromAuthors(result[0]);
            await authorEntity.createLinkToAuthors(coauthors);
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            console.log(e);
            return;
        };

        return res.redirect("/author");
  },
  ratePaper: async (req, res) => {
        const {rate} = req.body;
        const {id} = req.params;

        try {
            await paperEntity.ratePaper(id, rate);
        } catch(err) {
            console.log(err);
            return;
        }
        return res.redirect("/author");
  }
};
