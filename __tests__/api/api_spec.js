/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const frisby = require('frisby');

const { Joi } = frisby;

const API_URL = 'http://localhost:8000';

it('should basically function', function () {
  return frisby.get(`${API_URL}/hello`)
    .expect('status', 200);
});

it('should return a list of questions', function () {
  return frisby.get(`${API_URL}/qa/questions?product_id=65633`)
    .expect('status', 200)
    .expect('jsonTypes', 'results.*', {
      question_id: Joi.number().required(),
      question_body: Joi.string().required(),
      question_date: Joi.number().required(),
      asker_name: Joi.string().required(),
      question_helpfulness: Joi.number().required(),
      reported: Joi.boolean().required(),
    });
});

it('should return a list of answers', function () {
  return frisby.get(`${API_URL}/qa/questions/230753/answers`)
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      answer_id: Joi.number().required(),
      body: Joi.string().required(),
      date: Joi.string().required(),
      answerer_name: Joi.string().required(),
      helpfulness: Joi.number().required(),
      photos: Joi.array().required(),
    });
});
