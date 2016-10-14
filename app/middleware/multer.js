'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); // don't do this with real apps

module.exports = multer({ storage });
