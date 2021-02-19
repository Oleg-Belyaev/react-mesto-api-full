const router = require('express').Router();

const controllers = require('../controllers/cards');

router.get('/', controllers.getCards);
router.post('/', controllers.createCard);
router.delete('/:cardId', controllers.deleteCard);
router.put('/:cardId/likes', controllers.likeCard);
router.delete('/:cardId/likes', controllers.dislikeCard);

module.exports = router;
