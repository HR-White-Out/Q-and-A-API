const express = require('express');
const controller = require('./controllers');

const app = express();

require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());

/* -----------------------------QUESTIONS ROUTES----------------------------- */
app.get('/qa/questions', controller.questions.getAll);
app.post('/qa/questions', controller.questions.addQuestion);
app.put('/qa/questions/:question_id/helpful', controller.questions.markHelpful);
app.put('/qa/questions/:question_id/report', controller.questions.report);
/* ------------------------------ANSWERS ROUTES------------------------------ */
app.get('/qa/questions/:question_id/answers', controller.answers.getAnswers);
app.post('/qa/questions/:question_id/answers', controller.answers.addAnswer);
app.put('/qa/answers/:answer_id/helpful', controller.answers.markHelpful);
app.put('/qa/answers/:answer_id/report', controller.answers.report);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(
  PORT,
  () => { console.log(`Server running on port ${PORT}...`); },
);
