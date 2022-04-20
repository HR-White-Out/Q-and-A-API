COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
  FROM '/Users/jakegilfix/Hack Reactor/Projects/SDC/Q&A Data/questions.csv'
  DELIMITER ','
  CSV HEADER;

COPY answers(answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
  FROM '/Users/jakegilfix/Hack Reactor/Projects/SDC/Q&A Data/answers.csv'
  DELIMITER ','
  CSV HEADER;

COPY answer_photos(photo_id, answer_id, photo_url)
  FROM '/Users/jakegilfix/Hack Reactor/Projects/SDC/Q&A Data/answers_photos.csv'
  DELIMITER ','
  CSV HEADER;
