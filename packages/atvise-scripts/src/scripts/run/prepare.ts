import writePkg from 'write-pkg';
import { load } from '../../lib/config';
import { readJson } from '../../lib/fs';
import type { ScriptRunnerOptions } from '..';

export default async function runPrepare({ info, confirm }: ScriptRunnerOptions) {
  const pkg = await readJson('./package.json');
  const config = await load({ confirmFallback: confirm });

  const proxyUrl = `http://${config.host}:${config.port.http}`;

  if (pkg.proxy !== proxyUrl) {
    info('Updating proxy settings...');
    pkg.proxy = proxyUrl;
    writePkg('./package.json', pkg);
  }
}
