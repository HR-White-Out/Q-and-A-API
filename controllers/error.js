const createError = require('http-errors');

module.exports = {
  MISSING_PRODUCT_ID: createError(400, 'No product_id specified'),
  UNRECOGNIZED_PRODUCT_ID: createError(404, 'Unrecognized product_id.'),
  MISSING_QUESTION_BODY: createError(400, 'No body specified.'),
  BAD_REQUEST: createError(400, 'Bad request.'),
  MISSING_QUESTION_ID: createError(400, 'No question_id specified'),
  UNRECOGNIZED_QUESTION_ID: createError(404, 'Unrecognized question_id.'),
  MISSING_ANSWER_BODY: createError(400, 'No body specified.'),
};
