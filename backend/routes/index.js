const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const controllers = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), controllers.createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), controllers.login);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;
