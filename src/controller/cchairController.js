const paperEntity = require("../entity/paper");
const bidsEntity = require("../entity/bids");
const userEntity = require("../entity/user");
const { sendMail } = require("../config/mail");
require("dotenv").config();

module.exports = {
  getAllPapers: () => {
    return paperEntity.getAllPaper();
  },
  getPaperById: (id) => {
    return paperEntity.getPaperById(id);
  },
  getAllPapersByApproval: (type) => { 
    return paperEntity.getAllPapersByApproval(type)
  },
  searchBids: async (searchField) => {
    try {
      const rows = await bidsEntity.searchBids(searchField);
      const result = rows.filter(
        (row) =>
          row.name === searchField || row["reviewer.title"] === searchField
      );
      return result;
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  autoAllocate: async (papers) => {
    try {
      papers = [...papers];
      papers.forEach(async (paper) => {
        const nonAllocatedBids = await bidsEntity.getNonAllocatedBidsById(
          paper
        );
        console.log(nonAllocatedBids)
        for (const object of nonAllocatedBids) {
          const getCounts = await bidsEntity.countNumberOfBids(object.user_id);
          console.log("Number of bids" + getCounts);
          if (object.max_no_of_paper - getCounts >= 1) {
            selected = [object.user_id];
            console.log(object.max_no_of_paper - getCounts);
            console.log(selected);
            await Promise.all[
              (bidsEntity.createPaperAllocation(Number(paper), selected),
              bidsEntity.updateSuccessfulBids(Number(paper), selected),
              bidsEntity.updateFailedBids(Number(paper), selected))
            ];
          }
        }
      });
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  getAllocationDetails: async (paper_id, alloc = true, unalloc = false) => {
    try {
      const result = {};
      const paper = await paperEntity.getPaperById(paper_id);
      result.titleOfPaper = paper.title;

      console.log(paper.title);

      if (alloc) {
        let available = [];
        const reviewers = await bidsEntity.getNonAllocatedBidsById(paper_id);
        for (let reviewer of reviewers) {
          const getCounts = await bidsEntity.countNumberOfBids(
            reviewer.user_id
          );
          if (reviewer.max_no_of_paper - getCounts >= 1) {
            available.push(reviewer);
          }
        }
        result.alloc = available;
      }

      if (unalloc) {
        const allocatedReviewers = await bidsEntity.getAllocatedBidsById(
          paper_id
        );
        result.unalloc = allocatedReviewers;
      }

      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  createPaperAllocation: async (paper_id, selected) => {
    try {
      selected = [...selected];
      selected = selected.filter(Number);
      selected = selected.map((val) => Number(val));

      paper_id = Number(paper_id);

      const enoughSpace = [];
      for (const user_id of selected) {
        const user = await userEntity.getUserById(user_id);
        const getCounts = await bidsEntity.countNumberOfBids(user_id);
        if (user.max_no_of_paper - getCounts >= 1) {
          enoughSpace.push(user_id);
        }
      }

      if (enoughSpace.length > 0) {
        await Promise.all([
          bidsEntity.createPaperAllocation(paper_id, selected),
          bidsEntity.updateSuccessfulBids(paper_id, selected),
          bidsEntity.updateFailedBids(paper_id, selected),
        ]);
      }

      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  updatePaperAllocation: async (paper_id, selected) => {
    try {
      selected = [...selected];
      selected = selected.filter(Number);
      selected = selected.map((val) => Number(val));

      paper_id = Number(paper_id);

      const enoughSpace = [];
      for (const user_id of selected) {
        const user = await userEntity.getUserById(user_id);
        const getCounts = await bidsEntity.countNumberOfBids(user_id);
        if (user.max_no_of_paper - getCounts >= 1) {
          enoughSpace.push(user_id);
        }
      }

      await Promise.all([
        bidsEntity.removeAllocation(paper_id, enoughSpace),
        bidsEntity.createPaperAllocation(paper_id, enoughSpace)
      ]);

      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },

  acceptPaper: async (id, decisions, reasons) => {
    decisions = decisions == "approve" ? 1 : 0;
    reasons = decisions == 1 ? "Approved with no special reason..." : reasons;
    try {
      await paperEntity.updateApproveStatus(id, decisions, reasons);
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  },
  notifyUser: async (papers) => {
    const researchPaperIds = typeof papers == "string" ? [papers] : papers;
    const storedPapers = await paperEntity.getAuthorsByPaperIds(
      researchPaperIds
    );

    //convert to string first before converting to json object
    const allPapersToNotify = JSON.parse(JSON.stringify(storedPapers));

    const allMails = allPapersToNotify.map((paper) => {
      const to = paper.author.map((user) => user.email).join(", ");
      const approvedMessage = paper.approved ? "Approved" : "Rejected";
      message =
        "Good day sir/mdm,<br><br>" +
        `Your paper has been ${approvedMessage} with ${paper.reasons}!<br>` +
        "Please log in now to check your paper<br><br>" +
        "Thank you<br>" +
        "Best regards<br>" +
        "QWERTY Team<br><br>" +
        "<div style='font-weight:bold'>Please do not reply this message, as it is auto generated...</div>";
      mailOptions = {
        from: "csit314qwerty@gmail.com",
        to: to,
        subject: `Result for ${paper.title} - id ${paper.paper_id}`,
        html: message,
      };
      return sendMail(mailOptions);
    });

    await Promise.all(allMails);
    return "success";
  },
};
