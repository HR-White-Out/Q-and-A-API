const createError = require('http-errors');
const { questions } = require('../models');

// Error objects to handle problems gracefully:
const ERR = {
  MISSING_PRODUCT_ID: createError(400, 'No product_id specified'),
  UNRECOGNIZED_PRODUCT_ID: createError(404, 'Unrecognized product_id.'),
  MISSING_QUESTION_BODY: createError(400, 'No body specified.'),
  BAD_REQUEST: createError(400, 'Bad request.'),
};

module.exports = {
  // ************************************** SERVES `GET /qa/questions` ENDPOINT:
  getAll: (req, res, next) => {
    const { product_id: productID, page = 1, count = 5 } = req?.query || {};

    if (!productID) return next(ERR.MISSING_PRODUCT_ID);

    /* *************************************************************************
    * NOTE: Does _NOT_ include `answers` in this response because they _OUGHT_
    * to be requested separately by the front-end anyway.
    ************************************************************************* */
    const options = {
      where: { product_id: productID, reported: false },
      attributes: [
        'question_id', 'question_body', 'question_date', 'asker_name',
        'question_helpfulness', 'reported',
      ],
      order: [['question_helpfulness', 'DESC']],
      offset: (page - 1) * count,
      limit: count,
    };

    questions.findAll(options)
      .then((dbRes) => res.json({ product_id: productID, results: dbRes }))
      .catch(() => next(ERR.UNRECOGNIZED_PRODUCT_ID));
  },

  // ************************************* SERVES `POST /qa/questions` ENDPOINT:
  addQuestion: (req, res, next) => {
    const {
      body, name = 'Anonymous', email = 'test@test.com', product_id: productID,
    } = req?.body || {};

    if (!productID) return next(ERR.MISSING_PRODUCT_ID);
    if (!body) return next(ERR.MISSING_QUESTION_BODY);

    const newQuestion = {
      product_id: productID,
      question_body: body,
      asker_name: name,
      asker_email: email,
    };

    questions.create(newQuestion)
      .then(() => res.sendStatus(201))
      .catch(() => next(ERR.BAD_REQUEST));
  },

  // ***************** SERVES `PUT /qa/questions/:question_id/helpful` ENDPOINT:
  markHelpful: (params, req, res) => {
    // do stuff
  },

  // ****************** SERVES `PUT /qa/questions/:question_id/report` ENDPOINT:
  report: (params, req, res) => {
    // do stuff
  },
};
