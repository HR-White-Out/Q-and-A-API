const { answers, answerPhotos } = require('../models');
const ERR = require('./error');

module.exports = {
  // ***************** SERVES `GET /qa/questions/:question_id/answers` ENDPOINT:
  getAnswers: (req, res, next) => {
    const { question_id: questionID } = req?.params || {};
    const { page = 1, count = 5 } = req?.query || {};

    if (!questionID) return next(ERR.MISSING_QUESTION_ID);

    const options = {
      where: { question_id: questionID, reported: false },
      attributes: [
        'answer_id', 'body', 'date', 'answerer_name', 'helpfulness',
      ],
      include: [
        {
          model: answerPhotos,
          as: 'photos',
          attributes: ['photo_url'],
        },
      ],
      order: [['helpfulness', 'DESC']],
      offset: (page - 1) * count,
      limit: count,
    };

    answers.findAll(options)
      .then((dbRes) => {
        res.json(
          dbRes
            .map((el) => el.get())
            .map((a) => ({ ...a, photos: a.photos.map((x) => x.photo_url) })),
        );
      })
      .catch(() => next(ERR.UNRECOGNIZED_QUESTION_ID));
  },

  // **************** SERVES `POST /qa/questions/:question_id/answers` ENDPOINT:
  addAnswer: (req, res, next) => {
    const { question_id: questionID } = req?.params || {};
    const {
      body, name, email, photos,
    } = req?.body || {};

    if (!questionID) return next(ERR.MISSING_QUESTION_ID);
    if (!body) return next(ERR.MISSING_ANSWER_BODY);

    const newAnswer = {
      question_id: questionID,
      body,
      answerer_name: name,
      answerer_email: email,
      photos: photos.map((p) => ({ photo_url: p })),
    };

    const options = {
      include: [
        {
          model: answerPhotos,
          as: 'photos',
        },
      ],
    };

    answers.create(newAnswer, options)
      .then(() => res.sendStatus(201))
      .catch(() => next(ERR.BAD_REQUEST));
  },

  // ********************* SERVES `PUT /qa/answers/:answer_id/helpful` ENDPOINT:
  markHelpful: async (req, res, next) => {
    const { answer_id: answerID } = req?.params || {};

    if (!answerID) return next(ERR.BAD_REQUEST);

    try {
      const answer = await answers.findOne({ where: { answer_id: answerID } });

      answer.helpfulness += 1;

      await answer.save();

      return res.sendStatus(204);
    } catch { return next(ERR.BAD_REQUEST); }
  },

  // ********************** SERVES `PUT /qa/answers/:answer_id/report` ENDPOINT:
  report: (req, res, next) => {
    const { answer_id: answerID } = req?.params || {};

    if (!answerID) return next(ERR.BAD_REQUEST);

    answers.update(
      { reported: true },
      { where: { answer_id: answerID } },
    )
      .then(() => res.sendStatus(204))
      .catch(() => next(ERR.BAD_REQUEST));
  },
};
