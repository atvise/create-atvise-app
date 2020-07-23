import { promises as fsp } from 'fs';
import writePkg from 'write-pkg';
import type { Script } from '.';
import { load } from '../lib/config';

const prepare: Script = {
  name: 'prepare',
  description: 'Prepare project for atvise-scripts',
  async run({ info }) {
    const pkg = JSON.parse(await fsp.readFile('./package.json', 'utf8'));
    const config = await load({ fallbackToDefaults: true });

    const proxyUrl = `http://${config.host}:${config.port.http}`;

    if (pkg.proxy !== proxyUrl) {
      info('Updating proxy settings...');
      pkg.proxy = proxyUrl;
      writePkg('./package.json', pkg);
    }
  },
};

export default prepare;
