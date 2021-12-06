/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Обязательное поле'],
    unique: true,
    validate: [isEmail, 'Введен некорректный email'],
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
