const { query } = require("../config/db");

module.exports = {
  getMaxNoOfPaper: async (reviewer_id) => {
    const sql = "SELECT max_no_of_papers FROM reviewers WHERE reviewer_id = ?";
    const [rows] = await query(sql, [reviewer_id]);
    return rows[0];
  },
  createMaxNoOfPaper: (reviewer_id, maxNo = 0) => {
    const sql = "INSERT INTO reviewers VALUES (?, ?)";
    return query(sql, [reviewer_id, maxNo]);
  },
  updateMaxNoOfPaper: (reviewer_id, maxNo) => {
    const sql =
      "UPDATE reviewers SET max_no_of_papers = ? WHERE reviewer_id = ?";
    return query(sql, [maxNo, reviewer_id]);
  },
  getPapersByBids: async (reviewer_id, status = "Submitted") => {
    const sql =
      "SELECT * FROM papers WHERE status = ? AND" +
      " paper_id not in (SELECT paper_id FROM bids WHERE reviewer_id = ?)";
    const [rows] = await query(sql, [status, reviewer_id]);
    return rows;
  },
  createBids: async (bids) => {
    const sql = "INSERT INTO bids VALUES ?";
    return query(sql, [bids]);
  },
  getBiddedPapers: async (reviewer_id) => {
    const sql =
      "SELECT * FROM bids b INNER JOIN papers p" +
      " ON b.paper_id = p.paper_id WHERE reviewer_id = ?";
    const [rows] = await query(sql, [reviewer_id]);
    return rows;
  },
  removeBids: (reviewer_id, paper_id) => {
    const sql = "DELETE FROM bids WHERE reviewer_id = ? AND paper_id = ?";
    return query(sql, [reviewer_id, paper_id]);
  },
};
