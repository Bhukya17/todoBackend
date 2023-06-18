
// routes/todo.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  signup,
  login,
  tokenIsValid,
  getUserData,
} = require('../controllers/user');


router.post('/signup', signup);

router.post('/login', login);

router.post('/tokenIsValid', tokenIsValid);

router.get('/', auth, getUserData);

module.exports = router;
