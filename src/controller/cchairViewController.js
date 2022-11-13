const paperEntity = require("../entity/paper");

const cchairController = require("../controller/cchairController");

module.exports = {
  renderCCMainMenu: (req, res) => {
    return res.render("c-c-main-menu");
  },
  renderViewPapers: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("view-papers", {
      title: "Approve/Reject",
      link: "/cc/paper",
      data: rows,
    });
  },
  renderViewPaper: async (req, res) => {
    const { id } = req.params;
    const rows = await cchairController.getPaperById(id);
    const { title, paper, status } = rows;
    return res.render("view-single-paper-main", {
      titleOfPaper: title,
      paper: paper,
      status: status,
    });
  },
  renderAllocate: (req, res) => {
    return res.render("allocate-main");
  },
  renderAutoAllocate: async (req, res) => {},
  autoAllocateHandler: async (req, res) => {
    return;
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
    const {titleOfPaper, alloc} = await cchairController.getAllocationDetails(id);
    
    return res.render("manual-alloc", {
      titleOfPaper: titleOfPaper,
      alloc: alloc,
      unalloc: []
    });
  },
  renderApproveMain: async (req, res) => {
    const rows = await cchairController.getAllPapers();
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
    return res.render("approve-reject", {
      titleOfPaper: title,
      paper: paper,
      status: status,
    });
  },
  approvePaperHandler: async (req, res) => {
    const { id } = req.params;
    const { decisions, reasons } = req.body;
    await cchairController.acceptPaper(id, decisions, reasons);
    return res.redirect("/cc");
  },
  renderNotifyUser: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("add-remove-bids", {
      title: "Notify user",
      data: rows,
      error: "",
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
    await cchairController.notifyUser(papers);
    return res.redirect("/cc");
  },
};
