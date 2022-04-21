/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize');
const _answer_photos = require('./answer_photos');
const _answers = require('./answers');
const _questions = require('./questions');

function initModels(sequelize) {
  const answer_photos = _answer_photos(sequelize, DataTypes);
  const answers = _answers(sequelize, DataTypes);
  const questions = _questions(sequelize, DataTypes);

  answer_photos.belongsTo(answers, { as: 'answer', foreignKey: 'answer_id' });
  answers.hasMany(answer_photos, { as: 'answer_photos', foreignKey: 'answer_id' });
  answers.belongsTo(questions, { as: 'question', foreignKey: 'question_id' });
  questions.hasMany(answers, { as: 'answers', foreignKey: 'question_id' });

  return {
    answer_photos,
    answers,
    questions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
