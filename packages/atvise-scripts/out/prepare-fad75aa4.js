'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('debug');
require('./errors-52232f42.js');
var fs = require('fs');
require('deepmerge');
require('write-json-file');
var config = require('./config-c20a7d3e.js');
var writePkg = _interopDefault(require('write-pkg'));

async function runPrepare({
  info,
  confirm
}) {
  const pkg = JSON.parse(await fs.promises.readFile('./package.json', 'utf8'));
  const config$1 = await config.load({
    confirmFallback: confirm
  });
  const proxyUrl = `http://${config$1.host}:${config$1.port.http}`;

  if (pkg.proxy !== proxyUrl) {
    info('Updating proxy settings...');
    pkg.proxy = proxyUrl;
    writePkg('./package.json', pkg);
  }
}

exports.default = runPrepare;
