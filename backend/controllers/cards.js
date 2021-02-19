const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const id = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err._message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (!err.messageFormat) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (!err.messageFormat) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (!err.messageFormat) {
        return res.status(404).send({ message: `Нет карточки с id ${req.params.cardId}` });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
