const { sequelize } = require("../config/db");

const Paper = sequelize.models.papers;
const User = sequelize.models.users;

module.exports = {
    getAllPaper: () => {
        return Paper.findAll();
    },
    getPaperById: (id) => {
        return Paper.findByPk(id);
    },
    getPapersByAuthorId: async (author_id) => {
        const users = await User.findByPk(author_id, {
            include: [Paper]
          });
        return users.papers;
    },
    createPaper: (title, paper) => {
        return Paper.create(
            { title: title, paper: paper },
            { raw: true }
        );
    },
    updatePaper: (id, title, paper) => {
        return Paper.update(
            { title: title, paper: paper },
            { where: { paper_id: id } }
        );
    },
    ratePaper: (id, ratings) => {
        return Paper.update(
            { ratings: ratings },
            { where: { paper_id: id } }
        );
    }
}