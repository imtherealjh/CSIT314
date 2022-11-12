const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: async (req, res) => {
        const {userid} = req.session;
        const authors = await authorEntity.getNonCurrentAuthor(userid);
        return res.render("create-update-paper", {
                title: "Submit Paper",
                titleOfPaper: "",
                paper: "",
                data: authors
            });
    },
    retrieveAllPapers: async (req, res) => {
        //get papers by currentUser and pass to res.render
        //specify link so that can use the same page to render views for view/select papers
        const {userid} = req.session;
        const papers = await paperEntity.getPapersByAuthorId(userid);
        return res.render("view-papers", {
            title: "View all papers",
            link: "/author/paper",
            data: papers
        });
    },
    renderUpdateAllPapers: async (req, res) => {
        const {userid} = req.session;
        const papers = await paperEntity.getPapersByAuthorId(userid);
        return res.render("view-papers", {
            title: "View all papers",
            link: "/author/paper/update",
            data: papers
        });
    },
    renderUpdatePaper: async(req, res) => {
        const {userid} = req.session;
        const {id} = req.params;
        const authors = await authorEntity.getNonCurrentAuthor(userid);
        const paperObj = await paperEntity.getPaperById(id);
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
        const papers = await paperEntity.getPapersByAuthorId(userid);
        return res.render("view-papers", {
            title: "Rate papers",
            link: "/author/paper/rate",
            data: papers
        });
    },
    renderRateReview: async(req, res) => {
        const {id} = req.params;
        const paperObj = await paperEntity.getPaperById(id);
        const {title, paper, status} = paperObj; 
        return res.render("author-rate-review", {
            titleOfPaper: title,
            paper: paper,
            status: status
        });
    }
};