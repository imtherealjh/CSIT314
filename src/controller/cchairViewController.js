const authorEntity = require("../entity/author");
const paperEntity = require("../entity/paper");

const cchairController = require("../controller/cchairController");

module.exports = {
    renderCCMainMenu: (req, res) => {
        return res.render("c-c-main-menu");
    },
    renderAllocate: (req, res) => {
        return res.render("allocate-main");
    },
    renderAutoAllocate: async (req, res) => {

    },
    renderManualAllocateMain: async(req, res) => {

    },
    renderApproveMain : async (req, res) => {
        const rows = await paperEntity.getAllPaper();
        return res.render("view-papers", {
            title: "Approve/Reject",
            link: "/cc/approve",
            data: rows
        });
    },
    renderApprovePaper: async (req, res) => {
        const {id} = req.params;
        const rows = await paperEntity.getPaperById(id);
        const {title, paper, status} = rows
        return res.render("approve-reject", {
            titleOfPaper: title,
            paper: paper,
            status: status
        });
    },
    approvePaperHandler: async (req, res) => {
        const { id } = req.params;
        const { decisions, reasons } = req.body;
        const redirect = await cchairController.acceptPaper(id, decisions, reasons);
        return res.redirect(redirect);
    }
}