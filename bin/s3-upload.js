'use strict';

const fs = require('fs');

const upload = require('../lib/s3-upload').upload;

const filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

const logMessage = (response) => {
  // turn the pojo into a string so I can see it on the console
  console.log(`the response from AWS was ${JSON.stringify(response)}`);
};

readFile(filename)
.then(upload)
.then(logMessage)
.catch(console.error)
;
