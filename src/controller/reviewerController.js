
// should be model/entity
const reviewerModel = require("../models/reviewerModel");

module.exports = {
    updateMaxNoOfPaper: async (req, res) => {
        const {maxNo} = req.body;
        const {userid} = req.session;
        
        try {
            await reviewerModel.updateMaxNoOfPaper(userid, maxNo);
        } catch(err) {
            console.log(err);
            return;
        }

        return res.redirect("/reviewer")
    },
    submitBids: async (req, res) => {
        const {userid} = req.session;
        let {papers} = req.body;

        try {
            papers = typeof(papers) == "string" ? [papers] : papers;
            papers = papers.map((paper_id) => {
                return [userid, paper_id, 0, new Date()];
            });

            await reviewerModel.createBids(papers);
        } catch(err) {
            console.log(err);
            return;
        }
        return res.redirect("/reviewer");
    }, 
    removeBids: async (req, res) => {
        const {userid} = req.session;
        let {papers} = req.body;

        try {
            papers = typeof(papers) == "string" ? [papers] : papers;
            papers.forEach(async (value) => {
                await reviewerModel.removeBids(userid, value);
            })
            
        } catch(err) {
            console.log(err);
            return;
        }

        return res.redirect("/reviewer")
    }
    
};