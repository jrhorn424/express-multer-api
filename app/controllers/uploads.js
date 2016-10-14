'use strict';

const controller = require('lib/wiring/controller');
const multer = require('app/middleware').multer;

const models = require('app/models');
const Upload = models.upload;

const upload = require('lib/s3-upload').upload;

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

  upload(req.file.buffer) // use a stream instead req.file
  .then((response) => {
    return {
      location: response.Location, // from S3
      comment: req.body.upload.comment, // from our client
    };
  })
  .then(upload => Upload.create(upload)) // save the URL in Mongo
  .then(upload => res.json({ upload })) // send the created document to client
  .catch(error => next(error))
  ;
};

module.exports = controller({
  index,
  show,
  create,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only: ['create']},
], });
