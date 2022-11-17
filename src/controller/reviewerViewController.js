const reviewerModel = require("../entity/reviewer");
const paperEntity = require("../entity/paper");

module.exports = {
  renderMainMenu: (req, res) => {
    return res.render("reviewer-main-menu");
  },
  renderMaxNoOfPaper: async (req, res) => {
    const { userid } = req.session;
    const maxNoObj = await reviewerModel.getMaxNoOfPaper(userid);
    console.log('max', maxNoObj)
    return res.render("max-no-of-paper", {
      maxNo: maxNoObj ? maxNoObj.max_no_of_paper : 4,
    });
  },
  renderListPapers: async (req, res) => {
    const { userid } = req.session;
    const papers = await paperEntity.getAllPaper()
    return res.render("reviewer-list-papers", {
      data: papers,
    });
  },
  renderListPapersComments: async (req, res) => {
    const { userid } = req.session;
    const { id } = req.params;
    const paper = await paperEntity.getPaperById(id);
    const userReview = await reviewerModel.getReviewsByUPId(userid, id);
    let revData = [];
    if(userReview != null) {
      revData = await reviewerModel.getReviewsByPId(id);
    }

    return res.render("reviewer-comments", {
      data: paper,
      review: revData,
      user_id: userid,
      error: ""
    });
  },
  renderSubmitBids: async (req, res) => {
    //return the list of submitted papers for bidding
    const { userid } = req.session;
    const [bids, papers] = await Promise.all([
      reviewerModel.getBiddedPapers(userid),
    paperEntity.getAllPaper()
    ]);
    const biddedPaperIds = bids.map(b => b.paper_id)
    return res.render("add-remove-bids", {
      title: "Submit bids",
      data: papers.filter(p => !biddedPaperIds.includes(p.paper_id)),
      error: ""
    });
  },
  renderRemoveBids: async (req, res) => {
    //return the list of papers that user have bid for
    const { userid } = req.session;
    const bids = await reviewerModel.getBiddedPapers(userid);
    return res.render("add-remove-bids", {
      title: "Remove bids",
      data: bids.map(bid => {
        return bid.paperBids
      }),
      error: ""
    });
  },
  renderReviewPaperList: async (req, res) => {
    //return the list of papers that user have bid for
    const { userid } = req.session;
    const bids = await reviewerModel.getAllocatedPapers(userid);
    return res.render("reviewer-list-review-papers", {
      title: "Review Papers",
      data: bids.map(bid => {
        return bid.paperBids
      }),
      error: ""
    });
  },
  renderReviewPaper: async (req, res) => {
    //return the list of papers that user have bid for
    const { userid } = req.session;
    const { id } = req.params
    const paper = await paperEntity.getPaperById(id);
    const revData = await reviewerModel.getReviewsByUPId(userid, id);
    return res.render("reviewer-review-paper", {
      data : paper,
      review: revData,
      error: ""
    });
  },
};
