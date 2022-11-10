const { query } = require("../config/db");

module.exports = {
    getNonCurrentAuthor: async(author_id) => {
      const sql = "SELECT u.user_id, name FROM users u INNER JOIN users_profile up ON" +
                    " u.user_id = up.user_id WHERE up.role_name = 'author' AND NOT u.user_id = ?";
      const [rows] = await query(sql, [author_id]);
      return rows;
    },
    getPapersByAuthorId: async (author_id) => {
      const sql = "SELECT * FROM authors a INNER JOIN papers p ON" +
                    " a.paper_id = p.paper_id WHERE a.user_id = ?";
      const [rows] = await query(sql, [author_id]);
      return rows;
    },
    getPaperById: async(paper_id, user_id) => {
      const sql = "SELECT * FROM authors a INNER JOIN papers p" + 
                    " ON a.paper_id = p.paper_id" +
                    " WHERE p.paper_id = ? AND user_id = ?";
      const [rows] = await query(sql, [paper_id, user_id])
      return rows[0];
    },
    createPaper: async (title, paper) => {
      const sql = "INSERT INTO papers(title, paper, status) VALUES ?";
      const result = await query(sql, [[[title, paper, "Submitted"]]]);
      return result;
    },
    createLinkAuthorsPaper: async(params) => {
      const sql = "INSERT INTO authors(user_id, paper_id) VALUES ?";
      const result = await query(sql, [params]);
      return result;
    }, 
    removeLinkAuthorsPaper: async(paper_id) => {
      const sql = "DELETE FROM authors WHERE paper_id = ?";
      const result = await query(sql, [paper_id]);
      return result;
    }, 
    updatePaper: async(paper_id, title, paper) => {
      const sql = "UPDATE papers SET title=?, paper=? WHERE paper_id = ?";
      const result = await query(sql, [title, paper, paper_id]);
      return result;
    },
    rateReviews: async(paper_id, ratings) => {
      const sql = "UPDATE papers SET ratings=? WHERE paper_id=?";
      const result = await query(sql, [ratings, paper_id]);
      return result;
    }
};
