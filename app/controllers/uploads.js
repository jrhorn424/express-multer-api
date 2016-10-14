'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const models = require('app/models');
const Upload = models.upload;

// const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  // let upload = Object.assign(req.body.upload, {
  //   _owner: req.currentUser._id,
  // });

  let upload = {
    file: req.file,
    comment: req.body.upload.comment,
  };

  res.json({ upload });
  // Upload.create(upload)
  //   .then(upload => res.json({ upload }))
  //   .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only: ['create']},
], });
