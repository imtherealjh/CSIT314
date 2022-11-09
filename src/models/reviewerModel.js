const {query} = require("../config/db");

module.exports = {
    getMaxNoOfPaper : async (reviewerId) => {
        const sql = "SELECT max_no_of_paper FROM reviewers WHERE reviewer_id = ?";
        const [rows] = await query(sql, [reviewerId]);
        return rows[0];
    },
    createMaxNoOfPaper : (reviewerId, maxNo=0) => {
        const sql = "INSERT INTO reviewers VALUES (?, ?)";
        return query(sql, [reviewerId, maxNo])
    },
    updateMaxNoOfPaper : (reviewerId, maxNo) => {
        const sql = "UPDATE reviewers SET max_no_of_paper = ? WHERE reviewer_id = ?";
        return query(sql, [maxNo, reviewerId]);
    }
}