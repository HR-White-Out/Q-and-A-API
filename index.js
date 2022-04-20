const express = require('express');

const app = express();

require('dotenv').config();

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('Helo World!');
});

app.listen(
  PORT,
  () => { console.log(`Server running on port ${PORT}...`); },
);
