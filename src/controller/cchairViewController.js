const cchairModel = require("../entity/cchair");
const authorModel = require("../entity/author");

module.exports = {
    renderCCMainMenu: (req, res) => {
        return res.render("c-c-main-menu");
    },
    renderAllocate: (req, res) => {
        return res.render("allocate-main");
    },
    renderAutoAllocate: async (req, res) => {
        const rows = await cchairModel.getPapersByBid();
        return res.render("auto-alloc", {
            data: rows
        });
    },
    renderManualAllocateMain: async(req, res) => {
        const rows = await cchairModel.getPapersByBid();
        return res.render("view-papers", {
            title: "Manual allocation of paper",
            link: "/cc/allocate/manual",
            data: rows
        });
    },
    renderApproveMain : async (req, res) => {
        const rows = await authorModel.getAllPapers();
        return res.render("view-papers", {
            title: "Approve/Reject",
            link: "/cc/approve",
            data: rows
        });
    },
    renderApprovePaper: async (req, res) => {
        const {id} = req.params;
        const rows = await authorModel.getPaperById(id);
        const {title, paper, status} = rows
        return res.render("approve-reject", {
            titleOfPaper: title,
            paper: paper,
            status: status
        });
    }
}