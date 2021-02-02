import { join } from 'path';
import findPackages, { Project } from '@pnpm/find-workspace-packages';
import Template from '@ls-age/update-section';
import workspacePkg from '../package.json';

export function table(headers, rows) {
  const line = (cells) => `| ${cells.join(' | ')} |`;

  return `${line(headers)}
${line([':--', ':--'])}
${rows.map(line).join('\n')}`;
}

export async function syncMetadata(pkg: Project) {
  const manifest = pkg.manifest as typeof pkg.manifest & typeof workspacePkg;

  manifest.license = workspacePkg.license;
  manifest.bugs = workspacePkg.bugs;
  manifest.repository = {
    ...workspacePkg.repository,
    directory: pkg.dir,
  };

  await pkg.writeProjectManifest(manifest);
}

const packageFooter = `
---

This package is part of the [create-atvise-app](${workspacePkg.homepage}) project.

Refer to [it's documentation](${workspacePkg.homepage}) for more information.
`;

export async function syncPackages(root = '.') {
  const packages: Project[] = [];
  const rootReadme = new Template('README.md');

  for (const pkg of await findPackages(root, {})) {
    if (pkg.dir !== root) {
      await syncMetadata(pkg);
      packages.push(pkg);

      await Template.updateSection(join(pkg.dir, 'README.md'), 'footer', packageFooter);
    }
  }

  await rootReadme.updateSection(
    'packages',
    table(
      ['Name', 'Description'],
      packages.map(({ dir, manifest: { name, description } }) => [
        `[${name}](./${dir})`,
        description,
      ])
    )
  );

  await rootReadme.save();
}

if (!module.parent) {
  syncPackages().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
