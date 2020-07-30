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
  const manifest = pkg.manifest;

  manifest.repository = {
    ...workspacePkg.repository,
    directory: pkg.dir,
  };

  await pkg.writeProjectManifest(manifest);
}

export async function syncPackages(root = '.') {
  const packages: Project[] = [];

  for (const pkg of await findPackages(root, {})) {
    if (pkg.dir !== root) {
      await syncMetadata(pkg);
      packages.push(pkg);
    }
  }

  Template.updateSection(
    'README.md',
    'packages',
    table(
      ['Name', 'Description'],
      packages.map(({ dir, manifest: { name, description } }) => [
        `[${name}](./${dir})`,
        description,
      ])
    )
  );
}

if (!module.parent) {
  syncPackages().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
