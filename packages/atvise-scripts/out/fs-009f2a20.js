'use strict';

var fs = require('fs');

/* eslint-disable import/prefer-default-export */
async function readJson(path) {
  return JSON.parse(await fs.promises.readFile(path, 'utf8'));
}

exports.readJson = readJson;
