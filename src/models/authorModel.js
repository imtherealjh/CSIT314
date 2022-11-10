const { query } = require("../config/db");

module.exports = {
  getAllPapers: async (author_id) => {
    const sql =
      "SELECT * authors a INNER JOIN papers p ON" +
      " a.paper_id = p.paper_id WHERE a.author_id = ?";
    const [rows] = await query(sql, [author_id]);
    return rows;
  },
  createPaper: async (title, paper) => {
    const sql = "INSERT INTO papers(title, paper, status) VALUES ?";
    const result = await query(sql, [[[title, paper, "Submitted"]]]);
    return result;
  },
  createLinkAuthorsPaper: async(...params) => {
    const sql = "INSERT INTO authors(user_id, paper_id) VALUES ?";
  }
};
