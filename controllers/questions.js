const createError = require('http-errors');
const { questions } = require('../models');

module.exports = {
  // ****************************************** SERVES `/qa/questions` ENDPOINT:
  getAll: (req, res, next) => {
    const { product_id: productID, page = 1, count = 5 } = req?.query || {};

    if (!productID) return next(createError(400, 'No product_id specified.'));

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
      .catch(() => next(createError(404, 'Unrecognized product_id.')));
  },
  addQuestion: (bodyParams, req, res) => {
    // do stuff
  },
  markHelpful: (params, req, res) => {
    // do stuff
  },
  report: (params, req, res) => {
    // do stuff
  },
};
