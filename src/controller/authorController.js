const authorModel = require("../models/authorModel");
const {connection, transaction} = require("../config/db");

module.exports = {
    createPaper: async (req, res) => {
        const { userid } = req.session; 
        let { title, paper, coauthors } = req.body;

        await transaction();
        try {
            coauthors = coauthors ?? [userid];
            coauthors = typeof(coauthors) == "string" ? [coauthors, userid] : coauthors;
            const [ResultSetHeader] = await authorModel.createPaper(title, paper);

            coauthors = coauthors.map((e) => {
                return [Number(e), ResultSetHeader.insertId];
            });

            await authorModel.createLinkAuthorsPaper(coauthors);
            connection.commit();
        } catch (e) {
            connection.rollback();
            console.log(e);
            return;
        };

        return res.redirect("/author");
    },
    retrievePaper: async (req, res) => {
        const id = req.params.id;

        return res.render("view-single-paper-no-reviews");
    },
    updatePaper: async (req, res) => {
        const { userid } = req.session; 
        const { id } = req.params
        let { title, paper, coauthors } = req.body;

       
        await transaction();
        try {
            coauthors = coauthors ?? [userid];
            coauthors = typeof(coauthors) == "string" ? [coauthors, userid] : coauthors;
            coauthors = coauthors.map((e) => {
                return [Number(e), id];
            });

            await authorModel.updatePaper(id, title, paper);
            await authorModel.removeLinkAuthorsPaper(id);
            await authorModel.createLinkAuthorsPaper(coauthors);
            connection.commit();
        } catch (e) {
            connection.rollback();
            console.log(e);
            return;
        };

        return res.redirect("/author");
  },
  rateReviews: async (req, res) => {
        const {rate} = req.body;
        const {id} = req.params;
        try {
            await authorModel.rateReviews(id, rate);
        } catch(err) {
            console.log(err);
            return;
        }
        return res.redirect("/author");
  }
};
