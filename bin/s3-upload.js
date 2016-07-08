'use strict';

const fs = require('fs');

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

readFile(filename)
.then((data) => console.log(`${filename} is ${data.length} bytes long`))
.catch(console.error);
