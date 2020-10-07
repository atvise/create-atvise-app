import { join, extname } from 'path';
import { promises as fsp } from 'fs';
import readdirp from 'readdirp';
import { DataType, NodeClass } from 'node-opcua';
import setupDebug from 'debug';
import type * as Atscm from 'atscm';
import type * as AtscmApi from 'atscm/api';
import { load } from '../../lib/config';
import type { ScriptRunnerOptions } from '..';
import { readJson } from '../../lib/fs';

const debug = setupDebug('deploy');

let atscm: typeof Atscm;
let atscmApi: typeof AtscmApi;

export const resourceId = (path: string) =>
  new atscm.NodeId(join('ns=1;s=SYSTEM.LIBRARY.PROJECT.RESOURCES', path));

export class PathCreator {
  created = new Set<string>();

  async ensurePath(path: string) {
    let current: string | undefined;

    for (const part of path.split('/').slice(0, -1)) {
      current = current ? join(current, part) : part;

      if (!this.created.has(current)) {
        const nodeId = resourceId(current);

        await atscmApi.createNode(nodeId, {
          name: part,
          nodeClass: NodeClass.Object,
          typeDefinition: 61,
          value: {},
        });

        debug(`Created folder '${current}'`);

        this.created.add(current);
      }
    }
  }
}

enum ResourceType {
  Svg = 'VariableTypes.ATVISE.Resource.Svg',
}

const typeDefinifions = new Map<string, string>([
  ['.css', 'VariableTypes.ATVISE.Resource.Css'],
  ['.ico', 'VariableTypes.ATVISE.Resource.Icon'],
  ['.html', 'VariableTypes.ATVISE.Resource.Html'],
  ['.htm', 'VariableTypes.ATVISE.Resource.Html'],
  ['.png', 'VariableTypes.ATVISE.Resource.Png'],
  ['.js', 'VariableTypes.ATVISE.Resource.Javascript'],
  ['.txt', 'VariableTypes.ATVISE.Resource.Text'],
  // ['.svg', 'VariableTypes.ATVISE.Resource.OctetStream'],
  ['.svg', ResourceType.Svg],
  // FIXME: Remove
  ['.json', 'VariableTypes.ATVISE.Resource.OctetStream'],
  ['.map', 'VariableTypes.ATVISE.Resource.OctetStream'],
]);

export function getTypeDefinition(path: string) {
  const extension = extname(path);
  const match = typeDefinifions.get(extension);

  if (!match) {
    throw new Error(`No type definition for extension '${extension}'`);
  }

  return match;
}

export async function deployFile(
  entry: readdirp.EntryInfo,
  remotePath: string,
  { warn }: { warn: ScriptRunnerOptions['warn'] }
) {
  const nodeId = resourceId(remotePath);
  const typeDefinition = getTypeDefinition(entry.path);
  const value = {
    dataType: DataType.ByteString,
    value: await fsp.readFile(entry.fullPath),
  };

  const result = await atscmApi.createNode(nodeId, {
    name: entry.basename,
    typeDefinition,
    value,
  });
  const [{ value: createdNode }] = result.outputArguments[3].value;

  if (!createdNode) {
    debug(`'${nodeId}' already exists, overwriting...`);
    await atscmApi.writeNode(nodeId, value);
  }

  if (typeDefinition === ResourceType.Svg) {
    warn(`Attention: There are SVGs in your build output.

Please remove the reference from '${nodeId}' to '${ResourceType.Svg}.Translate' in atvise builder.
See https://github.com/LukasHechenberger/create-atvise-app/issues/14`);
  }

  debug(`Deployed '${nodeId}'`);
}

export default async function runDeploy({
  progress,
  warn,
  confirm = () => false,
  info,
}: ScriptRunnerOptions) {
  const config = await load({ confirmFallback: confirm });

  process.env.ATSCM_CONFIG_PATH = join(__dirname, '../Atviseproject.js');

  // Patch atscm config
  process.env.ATSCM_PROJECT__PORT__OPC = `${config.port.opc}`;
  process.env.ATSCM_PROJECT__HOST = `${config.host}`;

  atscm = await import('atscm');
  atscmApi = await import('atscm/api');

  // Resolve remote base path from 'homepage' field in package.json
  const pkg = await readJson('./package.json');
  let baseURL = new URL(`http://${config.host}:${config.port.http}`);
  if (pkg.homepage) {
    baseURL = new URL(pkg.homepage, baseURL);
    info(`Deploying to resource directory '.${baseURL.pathname}'`);
  }
  const base = baseURL.pathname;

  // Find and deploy files
  const paths = new PathCreator();

  let count = 0;

  for (const root of config.deploy.outPath) {
    for await (const entry of readdirp(root)) {
      const remotePath = join(base, entry.path);

      await paths.ensurePath(remotePath);
      await deployFile(entry, remotePath, { warn });

      progress?.(`Uploaded ${++count} files`);
    }
  }

  progress?.(`Uploaded ${count} files 🎉`);
  info(`
  You can view you deployment at ${baseURL}
`);
}
