const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');


const ctrl = {

  getAllTodo: (req, res) => {
    Todo.find({user: req.user.id})
        .then((todo) => res.json(todo))
        .catch((err) =>
          res
              .status(404)
              .json({message: 'Todo not found', error: err.message}),
        );
  },

  extractUserDetails: (req, res, next) => {
    // Get the token from the request header
    const token = req.headers.authorization;

    if (token) {
      try {
        // decode the token
        const decoded = jwt.decode(token);

        // Attach the user details to the request object
        req.user = decoded;

        next();
      } catch (error) {
        // Handle token verification error
        res.status(401).json({error: 'Invalid token'});
      }
    } else {
      res.status(401).json({error: 'Token not provided'});
    }
  },

  postCreateTodo: (req, res) => {
    const user = req.user.id;
    req.body.user = user;
    Todo.create(req.body)
        .then((data) => res.json({message: 'Todo added successfully', data}))
        .catch((err) =>
          res
              .status(400)
              .json({message: 'Failed to add todo', error: err.message}),
        );
  },

  putUpdateTodo: (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({message: 'updated successfully', data}))
        .catch((err) =>
          res
              .status(400)
              .json({message: 'Failed to update todo', error: err.message}),
        );
  },

  deleteTodo: (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
          res.json({message: 'todo deleted successfully', data}),
        )
        .catch((err) =>
          res
              .status(404)
              .json({message: 'book not found', error: err.message}),
        );
  },

};


module.exports = ctrl;
