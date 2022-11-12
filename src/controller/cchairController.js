const paperEntity = require("../entity/paper");

module.exports = {
    autoAllocateReviewers: async (req, res) => {
        let {papers} = req.body;
        try {
            
        } catch(err) {
            console.log(err);
            return;
        }
        return res.redirect("/cc");
    },
    acceptPaper: async (id, decisions, reasons) => {
        decisions = decisions == "approve" ? 1 : 0;
        reasons = decisions == 1 ? "Paper have been approved" : reasons;
        try {
            await paperEntity.updateApproveStatus(id, decisions, reasons);
            return "/cc";
        } catch(err) {
            console.log(err);
            return "/error";
        }
        
    }
}