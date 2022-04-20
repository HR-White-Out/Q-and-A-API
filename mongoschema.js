const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean,
});

const AnswerSchema = mongoose.Schema({
  answer_id: { type: Number, unique: true },
  question_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [String],
});
