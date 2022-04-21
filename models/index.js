const sequelize = require('../db');
const initModels = require('./init-models');

const { answer_photos: answerPhotos, answers, questions } = initModels(sequelize);

module.exports = {
  answerPhotos,
  answers,
  questions,
};
