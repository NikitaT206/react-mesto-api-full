/* eslint-disable consistent-return */
const Card = require('../models/card');
const ValidatonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = ((req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
});

module.exports.createCard = ((req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidatonError(err.message);
      }
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
});

module.exports.deleteCard = ((req, res, next) => {
  Card.findById(req.params.cardId)
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => {
          res.send(deletedCard);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports.likeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      res.send(data);
    })
    .catch(next);
});

module.exports.dislikeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      res.send(data);
    })
    .catch(next);
});
