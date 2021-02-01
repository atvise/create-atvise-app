const { join, relative, dirname, basename } = require('path');
const { promises: fsp } = require('fs');
const { copy } = require('fs-extra');
const { default: findPackages } = require('@pnpm/find-workspace-packages');

const repoRoot = join(__dirname, '../../..');
const docsRoot = join(__dirname, '..');

async function copyReadme(pkg, { target, name, frontMatter = {} }) {
  const outputPath = join(__dirname, '../docs/', target);

  // Create directory
  const outputAssetsPath = join(outputPath, './docs/assets');
  await fsp.mkdir(outputAssetsPath, { recursive: true });

  // Copy over asserts
  try {
    await copy(join(pkg.dir, 'docs/assets'), outputAssetsPath);
  } catch (_) {}

  // Copy readme
  const outputReadmePath = join(outputPath, 'README.md');

  const readmePath = join(pkg.dir, 'README.md');
  const readme = (await fsp.readFile(readmePath, 'utf8'))
    .replace(/^# .*/m, '') // Remove first header
    .replace(/<!-- BEGIN footer -->[\s\S]*/, ''); // Remove footer

  await fsp.writeFile(
    outputReadmePath,
    `---
slug: '/${target}'
title: '${name || pkg.manifest.name}'
${Object.entries(frontMatter)
  .map((f) => f.join(': '))
  .join('\n')}
---

<!-- NOTE: This file is copied from '${relative(repoRoot, readmePath)}', edit it over there! -->

${readme}`
  );
}

async function copyReadmes(root = repoRoot) {
  const indexes = [
    { dir: 'packages', items: [] },
    { dir: 'examples', items: [] },
  ];

  for (const pkg of await findPackages(root, {})) {
    if (![docsRoot].includes(pkg.dir)) {
      const repoRelativeDir = relative(root, pkg.dir);

      const isRoot = pkg.dir === root;
      if (!isRoot) {
        const index = indexes.find((i) => repoRelativeDir.startsWith(`${i.dir}/`));
        if (!index) {
          throw new Error(`Unhandled package '${repoRelativeDir}'`);
        }
        index.items.push(repoRelativeDir);
      }

      // Copy readme
      await copyReadme(
        pkg,
        isRoot
          ? {
              target: '',
              name: 'create-atvise-app',
              frontMatter: { sidebar_label: 'Introduction' },
            }
          : { target: repoRelativeDir }
      );
    }
  }

  // Create index files
  for (const index of indexes) {
    await fsp.writeFile(
      join(__dirname, `../docs/${index.dir}/index.js`),
      `module.exports = ${JSON.stringify(index.items.map((p) => `${p}/README`))}`
    );
  }
}

module.exports = copyReadmes;

if (require.main === module) {
  copyReadmes().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
