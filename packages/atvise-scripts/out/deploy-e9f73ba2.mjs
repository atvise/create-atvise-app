import setupDebug from 'debug';
import './errors-acc5bf8c.mjs';
import { join, extname } from 'path';
import { promises } from 'fs';
import readdirp from 'readdirp';
import { NodeClass, DataType } from 'node-opcua';
import 'deepmerge';
import 'write-json-file';
import { l as load } from './config-caa26806.mjs';
import { r as readJson } from './fs-83043593.mjs';

const debug = setupDebug('deploy');
let atscm;
let atscmApi;
const resourceId = path => new atscm.NodeId(join('ns=1;s=SYSTEM.LIBRARY.PROJECT.RESOURCES', path));
class PathCreator {
  constructor() {
    this.created = new Set();
  }

  async ensurePath(path) {
    let current;

    for (const part of path.split('/').slice(0, -1)) {
      current = current ? join(current, part) : part;

      if (!this.created.has(current)) {
        const nodeId = resourceId(current);
        await atscmApi.createNode(nodeId, {
          name: part,
          nodeClass: NodeClass.Object,
          typeDefinition: 61,
          value: {}
        });
        debug(`Created folder '${current}'`);
        this.created.add(current);
      }
    }
  }

}
var ResourceType;

(function (ResourceType) {
  ResourceType["Svg"] = "VariableTypes.ATVISE.Resource.Svg";
})(ResourceType || (ResourceType = {}));

const typeDefinifions = new Map([['.css', 'VariableTypes.ATVISE.Resource.Css'], ['.ico', 'VariableTypes.ATVISE.Resource.Icon'], ['.html', 'VariableTypes.ATVISE.Resource.Html'], ['.htm', 'VariableTypes.ATVISE.Resource.Html'], ['.png', 'VariableTypes.ATVISE.Resource.Png'], ['.js', 'VariableTypes.ATVISE.Resource.Javascript'], ['.txt', 'VariableTypes.ATVISE.Resource.Text'], // ['.svg', 'VariableTypes.ATVISE.Resource.OctetStream'],
['.svg', ResourceType.Svg], // FIXME: Remove
['.json', 'VariableTypes.ATVISE.Resource.OctetStream'], ['.map', 'VariableTypes.ATVISE.Resource.OctetStream']]);
function getTypeDefinition(path) {
  const extension = extname(path);
  const match = typeDefinifions.get(extension);

  if (!match) {
    throw new Error(`No type definition for extension '${extension}'`);
  }

  return match;
}
async function deployFile(entry, remotePath, {
  warn
}) {
  const nodeId = resourceId(remotePath);
  const typeDefinition = getTypeDefinition(entry.path);
  const value = {
    dataType: DataType.ByteString,
    value: await promises.readFile(entry.fullPath)
  };
  const result = await atscmApi.createNode(nodeId, {
    name: entry.basename,
    typeDefinition,
    value
  });
  const [{
    value: createdNode
  }] = result.outputArguments[3].value;

  if (!createdNode) {
    debug(`'${nodeId}' already exists, overwriting...`);
    await atscmApi.writeNode(nodeId, value);
  }

  if (typeDefinition === ResourceType.Svg) {
    warn(`Attention: There are SVGs in your build output.

Please remove the reference from '${nodeId}' to '${ResourceType.Svg}.Translate' in atvise builder.
See https://github.com/atvise/create-atvise-app/issues/14`);
  }

  debug(`Deployed '${nodeId}'`);
}
async function runDeploy({
  progress,
  warn,
  confirm = () => false,
  info
}) {
  const config = await load({
    confirmFallback: confirm
  });
  process.env.ATSCM_CONFIG_PATH = join(__dirname, '../Atviseproject.js'); // Patch atscm config

  process.env.ATSCM_PROJECT__PORT__OPC = `${config.port.opc}`;
  process.env.ATSCM_PROJECT__HOST = `${config.host}`;
  atscm = await import('atscm');
  atscmApi = await import('atscm/api'); // Resolve remote base path from 'homepage' field in package.json

  const pkg = await readJson('./package.json');
  let baseURL = new URL(`http://${config.host}:${config.port.http}`);

  if (pkg.homepage) {
    baseURL = new URL(pkg.homepage, baseURL);
    info(`Deploying to resource directory '.${baseURL.pathname}'`);
  }

  const base = baseURL.pathname; // Find and deploy files

  const paths = new PathCreator();
  let count = 0;

  for (const root of config.deploy.outPath) {
    for await (const entry of readdirp(root)) {
      const remotePath = join(base, entry.path);
      await paths.ensurePath(remotePath);
      await deployFile(entry, remotePath, {
        warn
      });
      progress === null || progress === void 0 ? void 0 : progress(`Uploaded ${++count} files`);
    }
  }

  progress === null || progress === void 0 ? void 0 : progress(`Uploaded ${count} files 🎉`);
  info(`
  You can view you deployment at ${baseURL}
`);
}

export default runDeploy;
export { PathCreator, deployFile, getTypeDefinition, resourceId };
