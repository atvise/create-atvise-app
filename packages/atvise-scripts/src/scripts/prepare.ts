import { promises as fsp } from 'fs';
import writePkg from 'write-pkg';
import { load } from '../lib/config';
import type { ScriptRunnerOptions } from '.';

export const name = 'prepare';
export const description = 'Prepare project for atvise-scripts';

export async function run({ info }: ScriptRunnerOptions) {
  const pkg = JSON.parse(await fsp.readFile('./package.json', 'utf8'));
  const config = await load({ fallbackToDefaults: true });

  const proxyUrl = `http://${config.host}:${config.port.http}`;

  if (pkg.proxy !== proxyUrl) {
    info('Updating proxy settings...');
    pkg.proxy = proxyUrl;
    writePkg('./package.json', pkg);
  }
}
