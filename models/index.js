const sequelize = require('../db');
const initModels = require('./init-models');

const { answer_photos, answers, questions } = initModels(sequelize);

module.exports = {
  answer_photos,
  answers,
  questions,
};
