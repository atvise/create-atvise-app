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
var errors = require('./errors-52232f42.js');
var merge = _interopDefault(require('deepmerge'));
var writeJsonFile = _interopDefault(require('write-json-file'));

const debug = setupDebug('config');
const defaults = {
  host: 'localhost',
  port: {
    opc: 4840,
    http: 80
  },
  deploy: {
    outPath: ['out', 'build']
  }
};
function normalize(atviserc) {
  const deployOutPath = atviserc.deploy.outPath;
  return { ...atviserc,
    deploy: { ...atviserc.deploy,
      outPath: Array.isArray(deployOutPath) ? deployOutPath : [deployOutPath]
    }
  };
}
const configName = '.atviserc.json';
const schemaUrl = 'https://atvise.github.io/create-atvise-app/schemas/atviserc.schema.json';
async function load({
  dir = process.cwd(),
  name = configName,
  path = `${dir}/${name}`,
  fallbackToDefaults = false,
  confirmFallback
} = {}) {
  let raw;

  try {
    raw = await Promise.resolve().then(function () { return _interopNamespace(require(path)); });
    debug(`Loaded config from '${path}'`);
  } catch (error) {
    if (fallbackToDefaults || (await (confirmFallback === null || confirmFallback === void 0 ? void 0 : confirmFallback('Failed to load config file, do you want to continue with defaults?')))) return defaults;
    throw errors.AppError.from(error, 'Failed to load config file', {
      tips: ["Run 'npx atvise-scripts init' first"]
    });
  }

  return normalize(merge(defaults, raw));
}
async function write(atviserc, {
  dir = process.cwd(),
  name = configName,
  path = `${dir}/${name}`
} = {}) {
  await writeJsonFile(configName, {
    $schema: schemaUrl,
    ...atviserc
  });
  debug(`Wrote config to '${path}'`);
  return {
    path
  };
}

exports.load = load;
exports.write = write;
