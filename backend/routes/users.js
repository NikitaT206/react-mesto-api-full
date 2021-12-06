/* eslint-disable no-useless-escape */
const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const {
  getUser, getUserById, updateUser, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/),
  }),
}), updateUserAvatar);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

module.exports = router;
