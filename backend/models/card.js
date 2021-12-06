/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
