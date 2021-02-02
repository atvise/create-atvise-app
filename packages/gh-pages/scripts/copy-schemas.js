const { join } = require('path');
const { copy } = require('fs-extra');

const repoRoot = join(__dirname, '../../..');

async function copySchemas(root = repoRoot) {
  copy(join(root, 'schemas'), join(__dirname, '../static/schemas'));
}

module.exports = copySchemas;

if (require.main === module) {
  copySchemas().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
