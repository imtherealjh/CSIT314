const authorModel = require("../models/authorModel");

module.exports = {
  createPaper: async (req, res) => {
    const { userid } = req.session;
    const { title, paper, coauthors } = req.body;
    try {
      const [ResultSetHeader] = await authorModel.createPaper(title, paper);

      let currentUser = coauthors.filter((e) => e == userid);
      const coauthors = Objects.values(coauthors);
      if (!currentUser) {
        coauthors.push(userid);
      }
      console.log(coauthors);

      console.log(typeof coauthors);
      coauthors = coauthors.map((e) => {
        return [Number(e), ResultSetHeader.insertId];
      });

      console.log(coauthors);
      console.log(ResultSetHeader);
    } catch (e) {}
    return res.redirect("/author");
  },
  retrievePaper: async (req, res) => {
    const id = req.params.id;

    return res.render("view-single-paper-no-reviews");
  },
  updatePaper: async (req, res) => {
    console.log(req.body);
  },
  rateReviews: async (req, res) => {},
};
