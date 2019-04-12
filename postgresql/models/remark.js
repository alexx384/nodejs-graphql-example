const Sequelize = require('sequelize');

const Remark = {
    _id: {type: Sequelize.STRING},
    name: {type: Sequelize.STRING},
    group: {type: Sequelize.STRING},
    rate: {type: Sequelize.INTEGER},
    date: {type: Sequelize.STRING}
};

module.exports = Remark;