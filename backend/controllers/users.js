/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidatonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

module.exports.getUser = ((req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
});

module.exports.getUserInfo = ((req, res, next) => {
  User.find(req.user)
    .then((user) => res.send({ data: user }))
    .catch(next);
});

module.exports.getUserById = ((req, res, next) => {
  User.findById(req.params.userId)
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      res.send({ data: user });
    })
    .catch(next);
});

module.exports.createUser = ((req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new ValidatonError(err.message);
          }
          if (!password) {
            throw new ValidatonError('Введите пароль');
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError('Пользователь с указанным email уже существует');
          }
        })
        .then((user) => res.send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        }))
        .catch(next);
    });
});

module.exports.updateUser = ((req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user, { name, about }, { new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidatonError('Переданы некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      res.send({ data: user });
    })
    .catch(next);
});

module.exports.updateUserAvatar = ((req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user, { avatar }, { new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidatonError('Переданы некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      res.send({ data: user });
    })
    .catch(next);
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправльные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправльные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });

          res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).send({ data: token });
        })

        .catch(next);
    })
    .catch(next);
};
