-- CREATE DATABASE questions_and_answers;

-- USE questions_and_answers;

-- ---
-- Table 'answer_photos'
-- 
-- ---

DROP TABLE IF EXISTS answer_photos;

CREATE TABLE answer_photos (
  photo_id  SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  photo_url VARCHAR(1024) NOT NULL,
  PRIMARY KEY (photo_id)
);

-- ---
-- Table 'answers'
-- 
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id       SERIAL NOT NULL,
  question_id     INTEGER NOT NULL,
  body            VARCHAR(1000) NOT NULL,
  date            VARCHAR(32) NOT NULL DEFAULT extract(epoch from now()),
  answerer_name   VARCHAR(60) DEFAULT 'Anonymous',
  answerer_email  VARCHAR(60) NOT NULL DEFAULT '',
  helpfulness     INTEGER DEFAULT 0,
  reported        BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (answer_id)
);

-- ---
-- Table 'questions'
-- 
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id           SERIAL NOT NULL,
  product_id            INTEGER NOT NULL,
  question_body         VARCHAR(1000) NOT NULL,
  question_date         VARCHAR(32) NOT NULL DEFAULT extract(epoch from now()),
  asker_name            VARCHAR(60) DEFAULT 'Anonymous',
  asker_email           VARCHAR(60) NOT NULL DEFAULT 'NULL',
  question_helpfulness  INTEGER DEFAULT 0,
  reported              BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (question_id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE answer_photos ADD FOREIGN KEY (answer_id) REFERENCES answers (answer_id);

-- ---
-- Starting values for new IDs
-- ---

ALTER SEQUENCE questions_question_id_seq RESTART WITH 3518964;
ALTER SEQUENCE answers_answer_id_seq RESTART WITH 6879307;
ALTER SEQUENCE answer_photos_photo_id_seq RESTART WITH 2063760;

-- ---
-- Table Properties
-- ---

-- ALTER TABLE answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answer_photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO answers (answer_id,question_id,body,date,answerer_name,answerer_email,helpfulness,reported) VALUES
-- ('','','','','','','','');
-- INSERT INTO questions (question_id,product_id,question_body,question_date,asker_name,asker_email,question_helpfulness,reported) VALUES
-- ('','','','','','','','');
-- INSERT INTO answer_photos (photo_id,answer_id,photo_url) VALUES
-- ('','','');