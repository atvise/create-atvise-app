import { promises as fsp } from 'fs';
import writePkg from 'write-pkg';
import { load } from '../../lib/config';
import type { ScriptRunnerOptions } from '..';

export default async function runPrepare({ info, confirm }: ScriptRunnerOptions) {
  const pkg = JSON.parse(await fsp.readFile('./package.json', 'utf8'));

  const config = await load({ confirmFallback: confirm });

  const proxyUrl = `http://${config.host}:${config.port.http}`;

  if (pkg.proxy !== proxyUrl) {
    info('Updating proxy settings...');
    pkg.proxy = proxyUrl;
    writePkg('./package.json', pkg);
  }
}
