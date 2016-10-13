#!/usr/bin/env node

'use strict';

const fs = require('fs');

const filename = process.argv[2] || '';

fs.readFile(filename, (error, data) => {
  if (error) {
    return console.error(error);
  }

  console.log(`${filename} is ${data.length} bytes long`);
});
