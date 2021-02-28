'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('debug');
var prompts = _interopDefault(require('prompts'));
var errors = require('./errors-52232f42.js');
require('deepmerge');
require('write-json-file');
var config = require('./config-d85930e1.js');

async function runInit({
  info,
  doInteractive
}) {
  const existing = await config.load({
    fallbackToDefaults: true
  });
  const questions = [{
    type: 'text',
    name: 'host',
    message: 'On which host is your atvise server running?',
    initial: existing.host
  }, {
    type: 'number',
    name: 'portOpc',
    message: 'Which OPC-UA port is your atvise server listening at?',
    initial: existing.port.opc
  }, {
    type: 'number',
    name: 'portHttp',
    message: 'Which HTTP port is your atvise server listening at?',
    initial: existing.port.http
  }];
  const {
    host = existing.host,
    portOpc = existing.port.opc,
    portHttp = existing.port.http
  } = await doInteractive(() => prompts(questions, {
    onCancel: () => {
      throw new errors.AppError('User cancelled');
    }
  }), {});
  const config$1 = {
    host,
    port: {
      opc: portOpc,
      http: portHttp
    }
  };
  const {
    path
  } = await config.write(config$1);
  info(`Wrote config to '${path}'`);
}

exports.default = runInit;
