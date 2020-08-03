import 'debug';
import './errors-acc5bf8c.mjs';
import { promises } from 'fs';
import 'deepmerge';
import 'write-json-file';
import { l as load } from './config-15fc8f88.mjs';
import writePkg from 'write-pkg';

async function runPrepare({
  info,
  confirm
}) {
  const pkg = JSON.parse(await promises.readFile('./package.json', 'utf8'));
  const config = await load({
    confirmFallback: confirm
  });
  const proxyUrl = `http://${config.host}:${config.port.http}`;

  if (pkg.proxy !== proxyUrl) {
    info('Updating proxy settings...');
    pkg.proxy = proxyUrl;
    writePkg('./package.json', pkg);
  }
}

export default runPrepare;
