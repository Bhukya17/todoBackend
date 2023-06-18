
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// Signup Route
const ctrl = {
  signup: async (req, res) => {
    try {
      const {email, password, confirmPassword, username} = req.body;
      if (!email || !password || !username || !confirmPassword) {
        return res.status(400).json({msg: 'Please enter all the fields'});
      }
      if (password.length < 6) {
        return res
            .status(400)
            .json({msg: 'Password should be atleast 6 characters'});
      }
      if (confirmPassword !== password) {
        return res.status(400).json({msg: 'Both the passwords dont match'});
      }
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res
            .status(400)
            .json({msg: 'User with the same email already exists'});
      }
      const hashedPassword = await bcryptjs.hash(password, 8);
      // eslint-disable-next-line max-len
      const newUser = new User({name: username, email, password: hashedPassword});

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  // Login Route
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({msg: 'Please enter all the fields'});
      }

      const user = await User.findOne({email});
      if (!user) {
        return res
            .status(400)
            .send({msg: 'User with this email does not exist'});
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({msg: 'Incorrect password.'});
      }
      const token = jwt.sign({id: user._id}, 'passwordKey');
      res.json({token, user: {id: user._id, username: user.username}});
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  // TO CHECK IF TOKEN IS VALID
  tokenIsValid: async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log('token---------------', token);

      if (!token) return res.json(false);
      const verified = jwt.verify(token, 'passwordKey');
      console.log('verified---------', verified);
      if (!verified) return res.json(false);
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      else req.user = user;
      return res.json(true);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  },

  // to get the users credentials and added middleware
  getUserData: async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({
      username: user.name,
      id: user._id,
      useremail: user.email,
    });
  },
};

module.exports = ctrl;


