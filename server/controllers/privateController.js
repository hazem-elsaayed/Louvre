const { validationResult } = require('express-validator');

const Art = require('../models/Art');
const validationHelper = require('../helpers/validations');
const authHelper = require('../helpers/auth');

exports.getArts = async (req, res, next) => {
  const currentPage = req.body.page || 1;
  const perPage = req.body.elements || 10;
  try {
    let arts = await Art.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched arts successfully.',
      arts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createArt = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // handle validation error
    if (!errors.isEmpty()) {
      validationHelper.handleValidationErrors(errors);
    }
    if (req.userRole !== 'Admin') {
      const error = new Error('Only Admin users have access to this endpoint');
      error.statusCode = 401;
      throw error;
    }
    let { artist, description } = req.body;
    let { path } = req.file;
    let art = new Art({
      artist,
      description,
      picture: path
    })
    let savedArt = await art.save()
    res.status(201).json({
      message: 'Art created successfully!',
      art: savedArt,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editArt = async (req, res, next) => {
  try {
    // handle validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      validationHelper.handleValidationErrors(errors);
    }
    authHelper.checkUserIsAdmin(req.userRole);
    let { artist, description } = req.body;
    let { id } = req.params;
    let editedArt = await Art.findByIdAndUpdate(
      id, { $set: { artist, description } },
      { new: true }
    );
    res.status(200).json({ message: 'Art updated!', art: editedArt });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
