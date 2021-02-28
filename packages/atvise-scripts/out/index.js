'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index-118f7abb.js');

const scriptRunner = script => options => {
  // FIXME: Lazy-load script modules
  return script.run({
    info: console.info,
    warn: console.warn,
    ...options
  });
};

const deploy = scriptRunner(index.deploy);
const prepare = scriptRunner(index.prepare);

exports.deploy = deploy;
exports.prepare = prepare;
