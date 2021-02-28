#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var index = require('./index-118f7abb.js');
var getopts = _interopDefault(require('getopts'));
var kleur = require('kleur');
var setupDebug = _interopDefault(require('debug'));
var ora = _interopDefault(require('ora'));
var prompts = _interopDefault(require('prompts'));
var ms = _interopDefault(require('ms'));
var errors = require('./errors-52232f42.js');

const debug = setupDebug('bin');

const loadPackage = () => Promise.resolve().then(function () { return _interopNamespace(require('../package.json')); });

const colorOption = (option, alias) => kleur.cyan(`--${option}${alias ? kleur.dim(`, -${alias}`) : ''}`);

const table = (lines, indent = '  ') => {
  const widths = lines.reduce((soFar, line) => soFar.map((s, i) => Math.max(s, line[i].length)), lines[0].map(() => 0));
  return `${indent}${lines.map(line => line.map((cell, i) => cell.padEnd(widths[i])).join(indent)).join(`\n${indent}`)}`;
};

const output = console;
async function printUsage(context) {
  var _context$scriptName, _context$script$descr, _context$script;

  const pkg = await loadPackage();
  const binName = Object.keys(pkg.bin)[0];
  const usage = `${binName} ${(_context$scriptName = context === null || context === void 0 ? void 0 : context.scriptName) !== null && _context$scriptName !== void 0 ? _context$scriptName : '<script>'} [options]`;
  const description = (_context$script$descr = context === null || context === void 0 ? void 0 : (_context$script = context.script) === null || _context$script === void 0 ? void 0 : _context$script.description) !== null && _context$script$descr !== void 0 ? _context$script$descr : pkg.description;
  const sections = [`${kleur.bold(`Usage: ${kleur.magenta(usage)}`)}

  ${description}`];

  if (!(context === null || context === void 0 ? void 0 : context.script)) {
    sections.push(kleur.bold('Scripts:'), table(Object.values(index.scripts).map(script => [kleur.cyan(script.name), script.description])));
  }

  sections.push(kleur.bold('Options:'), table([[colorOption('version', 'v'), `Print ${binName} version and exit`], [colorOption('help', 'h'), `Print usage and exit`]]));
  output.log(`${sections.join('\n\n')}\n`);
}
async function runScript(script, scriptName) {
  const interactive = process.stdout.isTTY;
  const spinner = interactive ? ora(`Running '${scriptName}'...`).start() : undefined;
  const progress = spinner ? text => spinner.text = `Running '${scriptName}': ${text}` : undefined;
  let persisted = false;

  const pauseSpinnerAsync = async fn => {
    if (persisted) {
      spinner === null || spinner === void 0 ? void 0 : spinner.stop();
    } else {
      spinner === null || spinner === void 0 ? void 0 : spinner.stopAndPersist();
      persisted = true;
    }

    const result = await fn();
    spinner === null || spinner === void 0 ? void 0 : spinner.start();
    return result;
  };

  const doInteractive = (fn, fallback) => {
    if (!process.stdout.isTTY) return fallback;
    return pauseSpinnerAsync(fn);
  };

  const pauseSpinnerAndLog = logFn => text => {
    if (persisted) {
      spinner === null || spinner === void 0 ? void 0 : spinner.stop();
    } else {
      spinner === null || spinner === void 0 ? void 0 : spinner.stopAndPersist();
      persisted = true;
    }

    logFn(text);
    spinner === null || spinner === void 0 ? void 0 : spinner.start();
  };

  const start = Date.now();

  try {
    await script.run({
      info: pauseSpinnerAndLog(text => output.info(kleur.grey(text))),
      warn: pauseSpinnerAndLog(text => output.warn(kleur.yellow(text))),
      progress,
      doInteractive,
      confirm: message => doInteractive(async () => {
        const {
          answer
        } = await prompts({
          type: 'confirm',
          name: 'answer',
          message,
          initial: false
        });
        return answer;
      }, false)
    });
    spinner === null || spinner === void 0 ? void 0 : spinner.succeed(`Finished '${scriptName}' after ${ms(Date.now() - start)}`);
  } catch (error) {
    spinner === null || spinner === void 0 ? void 0 : spinner.fail();
    throw error;
  }
}
async function runBin(argv = process.argv.slice(2)) {
  debug(`Running with argv '${argv.join(' ')}'`);
  const {
    _: [scriptName, ...positional],
    version,
    help
  } = getopts(argv, {
    alias: {
      version: ['v'],
      help: ['h']
    },
    unknown: option => {
      throw new errors.UsageError(`Unknown option '${option}'`);
    }
  }); // Handle '--version'

  if (version) {
    const pkg = await loadPackage();
    return output.log(pkg.version);
  }

  const script = index.scripts[scriptName];
  const scriptContext = script && {
    scriptName,
    script
  }; // Handle '--help'

  if (help) {
    return printUsage(scriptContext);
  }

  if (positional.length) {
    throw new errors.UsageError(`Unhandled arguments '${positional.join(' ')}'`);
  } // Get script


  if (!scriptName) {
    throw new errors.UsageError('No script name passed');
  }

  if (!script) {
    throw new errors.UsageError(`Unknown script '${scriptName}'`);
  }

  await runScript(script, scriptName);
}

if (!module.parent) {
  runBin().catch(async error => {
    if (error instanceof errors.AppError) {
      if (error instanceof errors.UsageError) {
        await printUsage();
      }

      output.error(kleur.red(error.message));

      if (error.tips.length) {
        output.info();
        error.tips.forEach(tip => output.info(kleur.grey(` - ${tip}`)));
      }
    } else {
      output.error(error);
    }

    process.exitCode = 1;
  });
}

exports.printUsage = printUsage;
exports.runBin = runBin;
exports.runScript = runScript;
