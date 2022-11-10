const authorModel = require("../models/authorModel");
const adminModel = require("../models/adminModel");

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: async (req, res) => {
        const authors = await adminModel.getUserProfileByRole("author");
        return res.render("create-update-paper", {
                nameOfPage: "Submit Paper",
                title: "",
                paper: "",
                data: authors
            });
    },
    retrieveAllPapers: async (req, res) => {
        const author_id = req.session.userid;
        const rows = await authorModel.getAllPapers(author_id)
        //get papers and pass to res.render
        //specify link so that can use the same page to render views for view/select papers
        return res.render("view-papers", {
            link: "/author/paper",
            data: rows
        });
    },
    renderUpdateAllPapers: async (req, res) => {
        return res.render("view-papers", {
            link: "/author/paper/update"
        })
    },
    renderUpdatePaper: async(req, res) => {
        return res.render("create-update-paper", {
                "nameOfPage": "Update Paper",
                "title": "abc",
                "paper": ""
            });
    },
    renderRateAllReviews: async(req, res) => {

    },
    renderRateReview: async(req, res) => {

    }
};