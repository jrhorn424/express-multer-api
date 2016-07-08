'use strict';

const fs = require('fs');
const fileType = require('file-type');

const mimeType = (data) => {
  return Object.assign({
    ext: 'bin',
    mime: 'application/octet-stream',
  }, fileType(data));
};

let filename = process.argv[2] || '';

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

const awsUpload = (file) => {
  const options = {
    ACL: 'public-read',
    Body: file.data,
    Bucket: 'ga-wdi-boston-jeffh',
    ContentType: file.mime,
    Key: `test/test.${file.ext}`,
  };
  return Promise.resolve(options);
  // return options;
};

readFile(filename)
.then((data) => {
  let file = mimeType(data);
  file.data = data;
  return file;
})
.then(awsUpload)
.then(console.log)
.catch(console.error);
