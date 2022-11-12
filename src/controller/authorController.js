const {sequelize} = require("../config/db");

const Users = sequelize.models.users;
const Papers = sequelize.models.papers;
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
                return {author_id: Number(e), paper_id: result.paper_id};
            });

            Users.findAll()
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
        const storedPaper = await paperEntity.getPaperById(id);
        const {title, paper, status} = storedPaper;
        return res.render("view-single-paper-main", {
            titleOfPaper: title,
            paper: paper,
            status: status
        });
    },
    updatePaper: async (req, res) => {
        const { userid } = req.session; 
        const { id } = req.params
        let { title, paper, coauthors } = req.body;

        const transaction = await sequelize.transaction();
        try {
            coauthors = coauthors ?? [userid];
            coauthors = typeof(coauthors) == "string" ? [coauthors, userid] : coauthors;

            await paperEntity.updatePaper(id, title, paper);
            coauthors = coauthors.map((e) => {
                return {author_id: Number(e), paper_id: id};
            });

            await authorEntity.removeLinkFromAuthors(id);
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
