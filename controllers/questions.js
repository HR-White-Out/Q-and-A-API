const { questions } = require('../models');
const ERR = require('./error');

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
      body, name, email, product_id: productID,
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
  markHelpful: async (req, res, next) => {
    const { question_id: questionID } = req?.params || {};

    if (!questionID) return next(ERR.BAD_REQUEST);

    try {
      const question = await questions.findOne({ where: { question_id: questionID } });

      question.question_helpfulness += 1;

      await question.save();

      return res.sendStatus(204);
    } catch { return next(ERR.BAD_REQUEST); }
  },

  // ****************** SERVES `PUT /qa/questions/:question_id/report` ENDPOINT:
  report: (req, res, next) => {
    const { question_id: questionID } = req?.params || {};

    if (!questionID) return next(ERR.BAD_REQUEST);

    questions.update(
      { reported: true },
      { where: { question_id: questionID } },
    )
      .then(() => res.sendStatus(204))
      .catch(() => next(ERR.BAD_REQUEST));
  },
};
