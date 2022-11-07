const conn = require('../config/db')



module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: (req, res) => {
        return res.render("create-update-paper", {
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
        return res.render()
    },
    renderUpdatePaper: async(req, res) => {
        return res.render("create-update-paper", {
                "nameOfPage": "Update Paper",
                "title": "abc",
                "paper": ""
            });
    },
    updatePaper: async (req, res) => {
        console.log(req.body)
    },
    renderRateAllReviews: async(req, res) => {

    },
    renderRateReview: async(req, res) => {

    },
    rateReviews: async (req, res) => {

    },
};