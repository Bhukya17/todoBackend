
// routes/todo.js
const express = require('express');
const router = express.Router();


const {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
  extractUserDetails,
} = require('../controllers/todo');

router.get('/', extractUserDetails, getAllTodo);
router.post('/', extractUserDetails, postCreateTodo);

router.put('/:id', putUpdateTodo);
router.delete('/:id', deleteTodo);


module.exports = router;
