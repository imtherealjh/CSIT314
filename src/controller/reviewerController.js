
// should be model/entity
const conn = require('../config/db');

module.exports = {
    renderMainMenu: (req, res) => {
        return res.render("reviewer-main-menu")
    },
    renderMaxNoOfPaper: (req, res) => {
        return res.render("max-no-of-paper")
    },
    updateMaxNoOfPaper: (req, res) => {
        
    },
    renderSubmitBids: (req, res) => {
        //return the list of submitted papers for bidding
        papers = ["Cyber security paper", "ReactJS paper"]
        return res.render("add-remove-bids", {
            "title": "Submit bids",
            "data": papers
        })
    }, 
    submitBids: (req, res) => {
        console.log(req.body)
    }, 
    renderRemoveBids: (req, res) => {
        //return the list of papers that user have bid for
        return res.render("add-remove-bids", {
            "title": "Remove bids"
        })
    },
    removeBids: (req, res) => {

    },
    
}