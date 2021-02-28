import 'debug';
import prompts from 'prompts';
import { A as AppError } from './errors-acc5bf8c.mjs';
import 'deepmerge';
import 'write-json-file';
import { l as load, w as write } from './config-caa26806.mjs';

async function runInit({
  info,
  doInteractive
}) {
  const existing = await load({
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
      throw new AppError('User cancelled');
    }
  }), {});
  const config = {
    host,
    port: {
      opc: portOpc,
      http: portHttp
    }
  };
  const {
    path
  } = await write(config);
  info(`Wrote config to '${path}'`);
}

export default runInit;
