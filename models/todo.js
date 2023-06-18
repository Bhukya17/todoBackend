const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: 'String',
    required: true,
  },
  description: {
    type: 'String',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    default: null,
  },
  subTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
  }],
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
