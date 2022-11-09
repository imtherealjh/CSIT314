const conn = require('../config/db')



module.exports = {
    createPaper: async (req, res) => {

    },
    retrievePaper: async (req, res) => {
        const id = req.params.id;

        return res.render("view-single-paper-no-reviews")
    },
    updatePaper: async (req, res) => {
        console.log(req.body)
    },
    rateReviews: async (req, res) => {

    },
};