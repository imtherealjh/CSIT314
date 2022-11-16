const authorController  = require("../controller/authorController");
const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");
const reviewerModel = require("../entity/reviewer");

module.exports = {
  renderMainMenu: (req, res) => {
    return res.render("author-main-menu");
  },
  renderSinglePaper: async (req, res) => {
    const { id } = req.params;
    const storedPaper = await authorController.getPaperById(id);
    const { title, paper, status } = storedPaper;
    const revData = await reviewerModel.getReviewsById(id);
    const ccoments = await reviewerModel.getAllCommentsByPaperId(id);
    return res.render("view-single-paper-main", {
      titleOfPaper: title,
      paper: paper,
      status: status,
      review: revData,
      comm: ccoments,
    });
  },
  renderViewPapers: async (req, res) => {
    //get papers by currentUser and pass to res.render
    //specify link so that can use the same page to render views for view/select papers
    const { userid } = req.session;
    const papers = await authorController.getPapersByAuthorId(userid);
    return res.render("view-papers", {
      title: "View all papers",
      link: "/author/paper",
      data: papers,
    });
  },
  renderCreatePaper: async (req, res) => {
    const { userid } = req.session;
    const authors = await authorEntity.getNonCurrentAuthor(userid);
    return res.render("create-update-paper", {
      title: "Submit Paper",
      titleOfPaper: "",
      paper: "",
      data: authors,
    });
  },
  createPaperHandler: async (req, res) => {
    const { userid } = req.session;
    let { title, paper, coauthors } = req.body;
    const result = await authorController.createPaper(userid, title, paper, coauthors);
    if (result == "success") {
      return res.render("success", { link: "/author" });
    } else {
      return res.render("error", { link: "/author" });
    }
  },
  renderUpdateAllPapers: async (req, res) => {
    const { userid } = req.session;
    const papers = await paperEntity.getPapersByAuthorId(userid);
    return res.render("view-papers", {
      title: "View all papers",
      link: "/author/paper/update",
      data: papers,
    });
  },
  renderUpdatePaper: async (req, res) => {
    const { userid } = req.session;
    const { id } = req.params;
    const authors = await authorEntity.getNonCurrentAuthor(userid);
    const paperObj = await authorController.getPaperById(id);
    const { title, paper } = paperObj;
    return res.render("create-update-paper", {
      title: "Update Paper",
      titleOfPaper: title,
      paper: paper,
      data: authors,
    });
  },
  updatePaperHandler: async (req, res) => {
    const { userid } = req.session;
    const { id } = req.params;
    let { title, paper, coauthors } = req.body;
    const result = await authorController.updatePaper(userid, id, title, paper, coauthors);
    if (result == "success") {
      return res.render("success", { link: "/author" });
    } else {
      return res.render("error", { link: "/author" });
    }
  },
  renderRateAllReviews: async (req, res) => {
    const { userid } = req.session;
    const papers = await authorController.getPapersByAuthorId(userid);
    return res.render("view-papers", {
      title: "Rate papers",
      link: "/author/paper/rate",
      data: papers,
    });
  },
  renderRateReview: async (req, res) => {
    const { id } = req.params;
    const paperObj = await authorController.getPaperById(id);
    const { title, paper, status } = paperObj;
    const revData = await reviewerModel.getReviewsById(id);
    const ccoments = await reviewerModel.getAllCommentsByPaperId(id);
    return res.render("author-rate-review", {
      titleOfPaper: title,
      paper: paper,
      status: status,
      review: revData,
      comm: ccoments,
    });
  },
  ratePaperHandler: async(req, res) => {
    const { rate } = req.body;
    const { id } = req.params;
    const result = await authorController.ratePaper(id, rate);
    if (result == "success") {
      return res.render("success", { link: "/author" });
    } else {
      return res.render("error", { link: "/author" });
    }
  }
};
