const authorModel = require("../models/authorModel");

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: async (req, res) => {
        const {userid} = req.session;
        const authors = await authorModel.getAllAuthors(userid);
        return res.render("create-update-paper", {
                title: "Submit Paper",
                titleOfPaper: "",
                paper: "",
                data: authors
            });
    },
    retrieveAllPapers: async (req, res) => {
        const {userid} = req.session;
        const rows = await authorModel.getAllPapers(userid);
        //get papers and pass to res.render
        //specify link so that can use the same page to render views for view/select papers
        return res.render("view-papers", {
            title: "View all papers",
            link: "/author/paper",
            data: rows
        });
    },
    renderUpdateAllPapers: async (req, res) => {
        const author_id = req.session.userid;
        const rows = await authorModel.getPapersByAuthorId(author_id);

        return res.render("view-papers", {
            title: "View all papers",
            link: "/author/paper/update",
            data: rows
        });
    },
    renderUpdatePaper: async(req, res) => {
        const {userid} = req.session;
        const {id} = req.params;
        const authors = await authorModel.getNonCurrentAuthor(userid);
        const paperObj = await authorModel.getPaperById(id, userid);
        const {title, paper} = paperObj
        return res.render("create-update-paper", {
                title: "Update Paper",
                titleOfPaper: title,
                paper: paper,
                data: authors
        });
    },
    renderRateAllReviews: async(req, res) => {
        const {userid} = req.session;
        const rows = await authorModel.getPapersByAuthorId(userid);
        return res.render("view-papers", {
            title: "Rate papers",
            link: "/author/paper/rate",
            data: rows
        });
    },
    renderRateReview: async(req, res) => {
        const {userid} = req.session;
        const {id} = req.params;
        const paperObj = await authorModel.getPaperById(id, userid);
        const {title, paper, status} = paperObj; 
        return res.render("author-rate-review", {
            titleOfPaper: title,
            paper: paper,
            status: status
        });
    }
};