
// should be model/entity
const reviewerModel = require("../models/reviewerModel");

module.exports = {
    updateMaxNoOfPaper: async (req, res) => {
        const {maxNo} = req.body;
        const {userid} = req.session;
        
        try {
            const result = await reviewerModel.updateMaxNoOfPaper(userid, maxNo);
            
        } catch(err) {
            console.log(err);
            return;
        }

        return res.redirect("/reviewer")
    },
    submitBids: (req, res) => {

    }, 
    removeBids: (req, res) => {

    },
    
};