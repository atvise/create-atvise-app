import 'debug';
import './errors-acc5bf8c.mjs';
import 'fs';
import 'deepmerge';
import 'write-json-file';
import { l as load } from './config-caa26806.mjs';
import { r as readJson } from './fs-83043593.mjs';
import writePkg from 'write-pkg';

async function runPrepare({
  info,
  confirm
}) {
  const pkg = await readJson('./package.json');
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
