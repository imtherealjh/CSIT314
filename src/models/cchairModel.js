const {query} = require("../config/db");

module.exports = {
    getPapersByBid : async () => {
        const sql = "SELECT * FROM papers WHERE paper_id IN" +
                    " (SELECT paper_id FROM bids"+
                    " GROUP BY paper_id" +
                    " HAVING COUNT(*) >= 1)"
        const [rows] = await query(sql);
        return rows;
    },
    getReviewersByBid : async (paper_ids) => {
        const sql = "SELECT b.reviewer_id, COUNT(*) as mylimit, r.max_no_of_papers" 
                        + " FROM bids b" 
                        + " INNER JOIN reviewers r ON b.reviewer_id = r.reviewer_id" 
                        + " WHERE b.paper_id in ? and b.successful = 0"
                        + " GROUP BY b.reviewer_id;"
        const [rows] = await query(sql, [[paper_ids]]);
        return rows;
    },
    updateBidsResult : async (reviewer_id, limit) => {
        const sql = "UPDATE bids SET successful = 1"
                    + " WHERE reviewer_id = ?"
                    + " ORDER BY bid_date ASC"
                    + " LIMIT ?"
        const result = await query(sql, [reviewer_id, limit]);
        console.log(result);
    }
};