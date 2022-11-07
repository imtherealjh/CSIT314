const conn = require('../config/db')

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: (req, res) => {
        return res.render("author-paper", {
            "nameOfPage": "Submit Paper",
            "title": "",
            "paper": ""
        });
    },
    createPaper: async (req, res) => {

    },
    retrievePaper: async (req, res) => {
        const id = req.params.id;

        return res.render("view-single-paper-no-reviews")
    },
    retrieveAllPapers: async (req, res) => {
        //get papers and pass to res.render
        return res.render("view-papers");
    },
    renderUpdateAllPapers: async (req, res) => {

    },
    renderUpdatePaper: async(req, res) => {

    },
    updatePaper: async (req, res) => {

    },
    rateReviews: async (req, res) => {

    },
};