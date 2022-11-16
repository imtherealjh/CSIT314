const paperEntity = require("../entity/paper");
const reviewerModel = require("../entity/reviewer");
const cchairController = require("../controller/cchairController");

module.exports = {
  renderCCMainMenu: (req, res) => {
    return res.render("c-c-main-menu");
  },
  renderViewPapers: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("view-papers", {
      title: "View All Papers",
      link: "/cc/paper",
      data: rows,
    });
  },
  renderViewPaper: async (req, res) => {
    const { id } = req.params;
    const rows = await cchairController.getPaperById(id);
    const { title, paper, status } = rows;
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
  renderAllocate: (req, res) => {
    return res.render("allocate-main");
  },
  renderAutoAllocate: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("auto-alloc", {
      data: rows,
    });
  },
  autoAllocateHandler: async (req, res) => {
    const { papers } = req.body;
    const result = await cchairController.autoAllocate(papers);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
  renderManualAllocateMain: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("view-papers", {
      title: "Manual Allocation Of Papers",
      link: "/cc/allocate/manual",
      data: rows,
    });
  },
  renderManualAllocate: async (req, res) => {
    const { id } = req.params;
    const allocation = await cchairController.getAllocationDetails(id);
    return res.render("manual-alloc", allocation);
  },
  manualAllocateHandler: async (req, res) => {
    const { id } = req.params;
    const { selected } = req.body;
    const result = await cchairController.createPaperAllocation(id, selected);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
  renderReallocateMain: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("view-papers", {
      title: "Reallocation Of Papers",
      link: "/cc/re-allocate",
      data: rows,
    });
  },
  renderReallocate: async (req, res) => {
    const { id } = req.params;
    const allocation = await cchairController.getAllocationDetails(
      id,
      true,
      true
    );
    return res.render("manual-alloc", allocation);
  },
  reallocateHandler: async (req, res) => {
    const { id } = req.params;
    const { selected } = req.body;
    const result = await cchairController.updatePaperAllocation(id, selected);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
  renderDeallocateMain: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("view-papers", {
      title: "Deallocation Of Papers",
      link: "/cc/de-allocate",
      data: rows,
    });
  },
  renderDeallocate: async (req, res) => {
    const { id } = req.params;
    const allocation = await cchairController.getAllocationDetails(
      id,
      false,
      true
    );
    return res.render("manual-alloc", allocation);
  },
  deallocateHandler: async (req, res) => {
    const { id } = req.params;
    const { selected } = req.body;
    const result = await cchairController.updatePaperAllocation(id, selected);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
  renderApproveMain: async (req, res) => {
    const rows = await cchairController.getAllSubmittedPapers();
    return res.render("view-papers", {
      title: "Approve/Reject",
      link: "/cc/approve",
      data: rows,
    });
  },
  renderApprovePaper: async (req, res) => {
    const { id } = req.params;
    const rows = await paperEntity.getPaperById(id);
    const { title, paper, status } = rows;
    const revData = await reviewerModel.getReviewsById(id);
    const ccoments = await reviewerModel.getAllCommentsByPaperId(id);
    return res.render("approve-reject", {
      titleOfPaper: title,
      paper: paper,
      status: status,
      review: revData,
      comm: ccoments,
    });
  },
  approvePaperHandler: async (req, res) => {
    const { id } = req.params;
    const { decisions, reasons } = req.body;
    const result = await cchairController.acceptPaper(id, decisions, reasons);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
  renderSearchUserPage: (req, res) => {
    return res.render("search-bids", {
      data: [],
    });
  },
  searchUserHandler: async (req, res) => {
    const { search } = req.body;
    const rows = await cchairController.searchBids(search);
    return res.render("search-bids", {
      data: rows,
    });
  },
  renderNotifyUser: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("notify-user", {
      title: "Notify user",
      data: rows,
    });
  },
  //handle post request
  notifyUserHandler: async (req, res) => {
    const { papers } = req.body;
    if (!papers) {
      const rows = await cchairController.getAllPapers();
      return res.render("add-remove-bids", {
        title: "Notify user",
        data: rows,
        error: "Please choose at least one of the choices...",
      });
    }
    const result = await cchairController.notifyUser(papers);
    if (result == "success") {
      return res.render("success", { link: "/cc" });
    } else {
      return res.render("error", { link: "/cc" });
    }
  },
};
