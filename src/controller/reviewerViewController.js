const reviewerModel = require("../models/reviewerModel");

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("reviewer-main-menu")
    },
    renderMaxNoOfPaper: async (req, res) => {
        const userId = req.session.userid
        const maxNoObj = await reviewerModel.getMaxNoOfPaper(userId);
        return res.render("max-no-of-paper", {
            maxNo: maxNoObj.max_no_of_paper
        })
    },
    renderSubmitBids: async (req, res) => {
        //return the list of submitted papers for bidding
        const {userid} = req.session
        const papers = await reviewerModel.getPapersByBids(userid);
        return res.render("add-remove-bids", {
            title: "Submit bids",
            data: papers
        })
    }, 
    renderRemoveBids: async (req, res) => {
        //return the list of papers that user have bid for
        const {userid} = req.session;
        const papers = await reviewerModel.getBiddedPapers(userid);
        console.log(papers);
        return res.render("add-remove-bids", {
            title: "Remove bids",
            data: papers
        })
    },
};