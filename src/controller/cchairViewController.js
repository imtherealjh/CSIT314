const paperEntity = require("../entity/paper");

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
    const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Quis auctor elit sed vulputate mi sit amet mauris. Tortor vitae purus faucibus ornare. Nulla facilisi etiam dignissim diam quis. Aenean vel elit scelerisque mauris pellentesque. Duis at consectetur lorem donec massa sapien faucibus et molestie. Natoque penatibus et magnis dis parturient montes nascetur. Nunc congue nisi vitae suscipit tellus mauris a. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Ultricies tristique nulla aliquet enim tortor at. Felis donec et odio pellentesque diam. Auctor eu augue ut lectus arcu bibendum at varius. Egestas sed tempus urna et.
    Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Vitae congue eu consequat ac felis. Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Sit amet mauris commodo quis. Sed enim ut sem viverra aliquet eget sit amet. Dis parturient montes nascetur ridiculus mus. Pharetra vel turpis nunc eget lorem dolor. Id volutpat lacus laoreet non curabitur gravida. Posuere sollicitudin aliquam ultrices sagittis. Feugiat in ante metus dictum at. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Diam maecenas sed enim ut sem viverra. Quis varius quam quisque id diam vel quam. Enim nec dui nunc mattis.`
    return res.render("view-single-paper-main", {
      titleOfPaper: title,
      paper: paper,
      status: status,
      reviews: [
        {
          name: "Reviewer 1",
          reviews: message,
          ratings: 100,
          subreviews: 5
        }
      ]
    });
  },
  renderAllocate: (req, res) => {
    return res.render("allocate-main");
  },
  renderAutoAllocate: async (req, res) => {
    const rows = await cchairController.getAllPapers();
    return res.render("auto-alloc", {
      data: rows
    })
  },
  autoAllocateHandler: async (req, res) => {
    const { papers } = req.body;
    const result = await cchairController.autoAllocate(papers);
    return res.redirect("/cc");
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
    await cchairController.createPaperAllocation(id, selected);
    return res.redirect("/cc");
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
    const allocation = await cchairController.getAllocationDetails(id, true, true);
    return res.render("manual-alloc", allocation);
  },
  reallocateHandler: async (req, res) => {
    const { id } = req.params;
    const { selected } = req.body;
    await cchairController.updatePaperAllocation(id, selected);
    return res.redirect("/cc");
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
    const allocation = await cchairController.getAllocationDetails(id, false, true);
    return res.render("manual-alloc", allocation);
  },
  deallocateHandler: async (req, res) => {
    const { id } = req.params;
    const { selected } = req.body;
    await cchairController.updatePaperAllocation(id, selected);
    return res.redirect("/cc");
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
