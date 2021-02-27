const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const controllers = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, controllers.getUsers);
router.get('/me', auth, controllers.getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), auth, controllers.getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, controllers.updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/),
  }),
}), auth, controllers.updateAvatar);

module.exports = router;
