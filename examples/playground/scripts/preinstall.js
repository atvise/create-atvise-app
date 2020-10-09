const { promises: fsp } = require('fs');
const { dirname } = require('path');

async function preinstall() {
  const file = 'node_modules/atvise-scripts/out/bin.js';

  await fsp.mkdir(dirname(file), { recursive: true });
  await fsp.stat(file).catch(async (error) => {
    if (error.code === 'ENOENT') {
      await fsp.writeFile(file, '', { encoding: 'utf8' });
    } else {
      throw error;
    }
  });
}

if (!module.parent) {
  preinstall().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
