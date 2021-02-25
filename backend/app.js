const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT = 3001 } = process.env;
const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use(errorLogger);
app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = '500', message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === '500' ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
