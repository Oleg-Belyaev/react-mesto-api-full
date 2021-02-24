const Card = require('../models/card');
const ValidationError = require('../errors/validation-error');
const AccessError = require('../errors/access-error');
const NotFoundError = require('../errors/not-foud-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      }
      next(err);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if ((card !== null) && ((card.owner.toString() || '') === req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardDelete) => res.send(cardDelete));
      } else if (card === null) {
        throw new NotFoundError(`Нет карточки с id ${req.params.cardId}`);
      } else {
        throw new AccessError('Нельзя удалять карточки, созданные другим пользователем');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(`Нет карточки с id ${req.params.cardId}`);
      }
      return res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(`Нет карточки с id ${req.params.cardId}`);
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
