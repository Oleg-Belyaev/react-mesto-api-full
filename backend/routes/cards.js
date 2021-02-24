const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const controllers = require('../controllers/cards');

router.get('/', auth, controllers.getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-Z0-9\-_]+)(.com|.net|.gov|.org|.in|.ru)(\/[\S]*)?/),
  }),
}), auth, controllers.createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, controllers.deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, controllers.likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, controllers.dislikeCard);

module.exports = router;
