const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isCelebrateError } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const ValidationError = require('./errors/validation-error');

const { PORT = 3001 } = process.env;
const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
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
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    if (err.details.get('params')) {
      throw new ValidationError(err.details.get('params').details[0].message);
    } else {
      throw new ValidationError(err.details.get('body').details[0].message);
    }
  }
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = '500', message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === '500' ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
