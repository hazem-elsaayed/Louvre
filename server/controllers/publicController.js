const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      handleValidationErrors(errors);
    }
    const { username, password, role, mobileNumber } = req.body;
    let hashedPass = await bcrypt.hash(password, 12);
    let user = new User({
      username,
      password: hashedPass,
      role,
      mobileNumber,
    });
    let savedUser = await user.save();
    res.status(201).json({
      message: 'User created!',
      user: {
        username: savedUser.username,
        mobileNumber: savedUser.mobileNumber,
        role: savedUser.role,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      handleValidationErrors(errors);
    }
    const { username, password } = req.body;
    let loadedUser = await User.findOne({ username });
    if (!loadedUser) {
      const error = new Error('A user with this username could not be found.');
      error.statusCode = 401;
      throw error;
    }
    let isCorrectPassword = await bcrypt.compare(
      String(password),
      loadedUser.password
    );
    if (!isCorrectPassword) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        role: loadedUser.role,
        username: loadedUser.username,
        userId: loadedUser._id.toString(),
      },
      'ExtremeSolution',
      { expiresIn: '1d' }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const handleValidationErrors = (errors) => {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
};
