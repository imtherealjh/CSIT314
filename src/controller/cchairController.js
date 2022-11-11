const cchairModel = require("../models/cchairModel");

module.exports = {
    autoAllocateReviewers: async (req, res) => {
        let {papers} = req.body;
        try {
            papers = typeof(papers) == "string" ? [papers] : papers;
            let result = await cchairModel.getReviewersByBid(papers);
            let unique = [...result];
            unique.forEach(async(val) => {
                bid = val.mylimit;
                max = val.max_no_of_papers;
                diff = Math.abs(max - bid);
                limit = bid >= max ? diff : diff;
                await cchairModel.updateBidsResult(val.reviewer_id, val.limit);
            })
            console.log(result);
        } catch(err) {
            console.log(err);
            return;
        }
        return res.redirect("/cc");
    },
    acceptPaper: (req, res) => {
        console.log(req.body);
    }
}