'use strict';

const name = 'deploy';
const description = 'Deploy build files to atvise server';

var deployMetadata = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name,
    description: description
});

const name$1 = 'prepare';
const description$1 = 'Prepare project for atvise-scripts';

var prepareMetadata = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$1,
    description: description$1
});

const name$2 = 'init';
const description$2 = 'Setup a project for atvise-scripts';

var initMetadata = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$2,
    description: description$2
});

const lazyRun = importRun => async options => {
  const {
    default: run
  } = await importRun();
  return run(options);
};

const deploy = { ...deployMetadata,
  run: lazyRun(() => Promise.resolve().then(function () { return require('./deploy-fa4b6fb1.js'); }))
};
const prepare = { ...prepareMetadata,
  run: lazyRun(() => Promise.resolve().then(function () { return require('./prepare-fad75aa4.js'); }))
};
const init = { ...initMetadata,
  run: lazyRun(() => Promise.resolve().then(function () { return require('./init-5fc87623.js'); }))
};

var scripts = /*#__PURE__*/Object.freeze({
    __proto__: null,
    deploy: deploy,
    prepare: prepare,
    init: init
});

exports.deploy = deploy;
exports.prepare = prepare;
exports.scripts = scripts;
