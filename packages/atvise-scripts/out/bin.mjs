import { s as scripts } from './index-15ac3ac7.mjs';
import getopts from 'getopts';
import { bold, magenta, cyan, dim, grey, yellow, red } from 'kleur';
import setupDebug from 'debug';
import ora from 'ora';
import prompts from 'prompts';
import ms from 'ms';
import { U as UsageError, A as AppError } from './errors-acc5bf8c.mjs';

const debug = setupDebug('bin');

const loadPackage = () => import('../package.json');

const colorOption = (option, alias) => cyan(`--${option}${alias ? dim(`, -${alias}`) : ''}`);

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
  const sections = [`${bold(`Usage: ${magenta(usage)}`)}

  ${description}`];

  if (!(context === null || context === void 0 ? void 0 : context.script)) {
    sections.push(bold('Scripts:'), table(Object.values(scripts).map(script => [cyan(script.name), script.description])));
  }

  sections.push(bold('Options:'), table([[colorOption('version', 'v'), `Print ${binName} version and exit`], [colorOption('help', 'h'), `Print usage and exit`]]));
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
      info: pauseSpinnerAndLog(text => output.info(grey(text))),
      warn: pauseSpinnerAndLog(text => output.warn(yellow(text))),
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
      throw new UsageError(`Unknown option '${option}'`);
    }
  }); // Handle '--version'

  if (version) {
    const pkg = await loadPackage();
    return output.log(pkg.version);
  }

  const script = scripts[scriptName];
  const scriptContext = script && {
    scriptName,
    script
  }; // Handle '--help'

  if (help) {
    return printUsage(scriptContext);
  }

  if (positional.length) {
    throw new UsageError(`Unhandled arguments '${positional.join(' ')}'`);
  } // Get script


  if (!scriptName) {
    throw new UsageError('No script name passed');
  }

  if (!script) {
    throw new UsageError(`Unknown script '${scriptName}'`);
  }

  await runScript(script, scriptName);
}

if (!module.parent) {
  runBin().catch(async error => {
    if (error instanceof AppError) {
      if (error instanceof UsageError) {
        await printUsage();
      }

      output.error(red(error.message));

      if (error.tips.length) {
        output.info();
        error.tips.forEach(tip => output.info(grey(` - ${tip}`)));
      }
    } else {
      output.error(error);
    }

    process.exitCode = 1;
  });
}

export { printUsage, runBin, runScript };
