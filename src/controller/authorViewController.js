module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("author-main-menu");
    },
    renderCreatePaper: (req, res) => {
        return res.render("create-update-paper", {
                nameOfPage: "Submit Paper",
                title: "",
                paper: ""
            });
    },
    retrieveAllPapers: async (req, res) => {
        //get papers and pass to res.render
        //specify link so that can use the same page to render views for view/select papers
        return res.render("view-papers", {
            link: "/author/paper"
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