'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

var setupDebug = _interopDefault(require('debug'));
require('./errors-52232f42.js');
var path = require('path');
var fs = require('fs');
var readdirp = _interopDefault(require('readdirp'));
var nodeOpcua = require('node-opcua');
require('deepmerge');
require('write-json-file');
var config = require('./config-c20a7d3e.js');

const debug = setupDebug('deploy');
let atscm;
let atscmApi;
const resourceId = path => new atscm.NodeId(`ns=1;s=SYSTEM.LIBRARY.PROJECT.RESOURCES/${path}`);
class PathCreator {
  constructor() {
    this.created = new Set();
  }

  async ensurePath(path$1) {
    let current;

    for (const part of path$1.split('/').slice(0, -1)) {
      current = current ? path.join(current, part) : part;

      if (!this.created.has(current)) {
        const nodeId = resourceId(current);
        await atscmApi.createNode(nodeId, {
          name: part,
          nodeClass: nodeOpcua.NodeClass.Object,
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
function getTypeDefinition(path$1) {
  const extension = path.extname(path$1);
  const match = typeDefinifions.get(extension);

  if (!match) {
    throw new Error(`No type definition for extension '${extension}'`);
  }

  return match;
}
async function deployFile(entry, {
  warn
}) {
  const nodeId = resourceId(entry.path);
  const value = await fs.promises.readFile(entry.fullPath);
  const typeDefinition = getTypeDefinition(entry.path);
  await atscmApi.createNode(nodeId, {
    name: entry.basename,
    typeDefinition,
    value: {
      dataType: nodeOpcua.DataType.ByteString,
      value
    }
  });

  if (typeDefinition === ResourceType.Svg) {
    warn(`Attention: There are SVGs in your build output.

Please remove the reference from '${nodeId}' to '${ResourceType.Svg}.Translate' in atvise builder`);
  }

  debug(`Deployed '${nodeId}'`);
}
async function runDeploy({
  progress,
  warn,
  confirm = () => false
}) {
  const config$1 = await config.load({
    confirmFallback: confirm
  });
  process.env.ATSCM_CONFIG_PATH = path.join(__dirname, '../Atviseproject.js'); // Patch atscm config

  process.env.ATSCM_PROJECT__PORT__OPC = `${config$1.port.opc}`;
  process.env.ATSCM_PROJECT__HOST = `${config$1.host}`;
  atscm = await Promise.resolve().then(function () { return _interopNamespace(require('atscm')); });
  atscmApi = await Promise.resolve().then(function () { return _interopNamespace(require('atscm/api')); }); // Find and deploy files

  const paths = new PathCreator();
  let count = 0;

  for (const root of config$1.deploy.outPath) {
    for await (const entry of readdirp(root)) {
      await paths.ensurePath(entry.path);
      await deployFile(entry, {
        warn
      });
      progress === null || progress === void 0 ? void 0 : progress(`Uploaded ${++count} files`);
    }
  }

  progress === null || progress === void 0 ? void 0 : progress(`Uploaded ${count} files 🎉`);
}

exports.PathCreator = PathCreator;
exports.default = runDeploy;
exports.deployFile = deployFile;
exports.getTypeDefinition = getTypeDefinition;
exports.resourceId = resourceId;
