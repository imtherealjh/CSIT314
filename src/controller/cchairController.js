const paperEntity = require("../entity/paper");
const bidsEntity = require("../entity/bids");
const { sendMail } = require("../config/mail");;
require("dotenv").config();

module.exports = {
  getAllPapers: () => {
    return paperEntity.getAllPaper();
  },
  getPaperById: (id) => {
    return paperEntity.getPaperById(id);
  },
  autoAllocateReviewers: (papers) => {
    try {
    } catch (err) {
      console.log(err);
      return;
    }
    return "success";
  },
  getAllocationDetails: async (paper_id, alloc = true, unalloc = false) => {
    try {
      const result = {};
      const paper = await paperEntity.getPaperById(paper_id);
      result.titleOfPaper = paper.title;
      if (alloc) {
        const reviewers = await bidsEntity.getBidsById(paper_id);
        console.log(reviewers);
        result.alloc = reviewers;
      }

      if(unalloc) {
        const allocatedReviewers = await bidsEntity.getAllocatedBidsById(paper_id);
        result.unalloc = allocatedReviewers
      }

      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  createPaperAllocation : async (paper_id, selected) => {
    try{
      selected = [...selected];
      selected = selected.filter(Number);
      selected = selected.map(val => Number(val));
      
      paper_id = Number(paper_id);

      const result = await bidsEntity.createPaperAllocation(paper_id, selected);
      console.log(result);
    }
    catch(err) {
      console.log(err);
      return;
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
        from: process.env.GMAIL_USER,
        to: to,
        subject: `Result for ${paper.title} - id ${paper.paper_id}`,
        html: message,
      };
      return sendMail(mailOptions);
    });

    const result = await Promise.all(allMails);
    return "success";
  },
};
