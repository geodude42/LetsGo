const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

// Make a POST request to signup:
router.post('/signup', userController.checkEmail, userController.bcrypt, userController.addUser, (req, res) => {
  res.status(200).send(res.locals.users);
});
// Make a POST request to signin:
router.post('/signin', userController.login, cookieController.setSSIDCookie, (req, res) => {
  console.log('USER: ', res.locals.users);
  res.status(200).send(res.locals.users);
});

module.exports = router;
