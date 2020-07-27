import getopts from 'getopts';
import { bold, magenta, cyan, dim, red, yellow, grey } from 'kleur';
import setupDebug from 'debug';
import ora from 'ora';
import prompts from 'prompts';
import ms from 'ms';
import * as scripts from './scripts';
import { UsageError, AppError } from './lib/errors';

const debug = setupDebug('bin');

const loadPackage = () => import('../package.json');

const colorOption = (option: string, alias?: string) =>
  cyan(`--${option}${alias ? dim(`, -${alias}`) : ''}`);

type UsageContext = { script: scripts.Script; scriptName: string };

const table = (lines: string[][], indent = '  ') => {
  const widths = lines.reduce(
    (soFar, line) => soFar.map((s, i) => Math.max(s, line[i].length)),
    lines[0].map(() => 0)
  );

  return `${indent}${lines
    .map((line) => line.map((cell, i) => cell.padEnd(widths[i])).join(indent))

    .join(`\n${indent}`)}`;
};

const output = console;

export async function printUsage(context?: UsageContext): Promise<void> {
  const pkg = await loadPackage();
  const binName = Object.keys(pkg.bin)[0];

  const usage = `${binName} ${context?.scriptName ?? '<script>'} [options]`;
  const description = context?.script?.description ?? pkg.description;

  const sections = [
    `${bold(`Usage: ${magenta(usage)}`)}

  ${description}`,
  ];

  if (!context?.script) {
    sections.push(
      bold('Scripts:'),
      table(Object.values(scripts).map((script) => [cyan(script.name), script.description]))
    );
  }

  sections.push(
    bold('Options:'),
    table([
      [colorOption('version', 'v'), `Print ${binName} version and exit`],
      [colorOption('help', 'h'), `Print usage and exit`],
    ])
  );

  output.log(`${sections.join('\n\n')}\n`);
}

export async function runScript(script: scripts.Script, scriptName: string) {
  const interactive = process.stdout.isTTY;

  const spinner: ora.Ora | undefined = interactive
    ? ora(`Running '${scriptName}'...`).start()
    : undefined;

  const progress = spinner
    ? (text: string) => (spinner.text = `Running '${scriptName}': ${text}`)
    : undefined;

  let persisted = false;
  const pauseSpinnerAsync = async <R>(fn: () => R | Promise<R>) => {
    if (persisted) {
      spinner?.stop();
    } else {
      spinner?.stopAndPersist();
      persisted = true;
    }

    const result = await fn();
    spinner?.start();
    return result;
  };

  const doInteractive = <R>(fn: () => R | Promise<R>, fallback: R) => {
    if (!process.stdout.isTTY) return fallback;

    return pauseSpinnerAsync(fn);
  };

  const pauseSpinnerAndLog = (logFn: (text: string) => void) => (text: string) => {
    if (persisted) {
      spinner?.stop();
    } else {
      spinner?.stopAndPersist();
      persisted = true;
    }

    logFn(text);
    spinner?.start();
  };

  const start = Date.now();
  try {
    await script.run({
      info: pauseSpinnerAndLog((text: string) => output.info(grey(text))),
      warn: pauseSpinnerAndLog((text: string) => output.warn(yellow(text))),
      progress,
      doInteractive,
      confirm: (message) =>
        doInteractive<boolean>(async () => {
          const { answer } = await prompts({
            type: 'confirm',
            name: 'answer',
            message,
            initial: false,
          });

          return answer as boolean;
        }, false),
    });
    spinner?.succeed(`Finished '${scriptName}' after ${ms(Date.now() - start)}`);
  } catch (error) {
    spinner?.fail();
    throw error;
  }
}

export async function runBin(argv = process.argv.slice(2)): Promise<void> {
  debug(`Running with argv '${argv.join(' ')}'`);
  const {
    _: [scriptName, ...positional],
    version,
    help,
  } = getopts(argv, {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    unknown: (option) => {
      throw new UsageError(`Unknown option '${option}'`);
    },
  });

  // Handle '--version'
  if (version) {
    const pkg = await loadPackage();
    return output.log(pkg.version);
  }

  const script = scripts[scriptName as keyof typeof scripts];
  const scriptContext = script && { scriptName, script };

  // Handle '--help'
  if (help) {
    return printUsage(scriptContext);
  }

  if (positional.length) {
    throw new UsageError(`Unhandled arguments '${positional.join(' ')}'`);
  }

  // Get script
  if (!scriptName) {
    throw new UsageError('No script name passed');
  }

  if (!script) {
    throw new UsageError(`Unknown script '${scriptName}'`);
  }

  await runScript(script, scriptName);
}

if (!module.parent) {
  runBin().catch(async (error) => {
    if (error instanceof AppError) {
      if (error instanceof UsageError) {
        await printUsage();
      }

      output.error(red(error.message));

      if (error.tips.length) {
        output.info();
        error.tips.forEach((tip) => output.info(grey(` - ${tip}`)));
      }
    } else {
      output.error(error);
    }

    process.exitCode = 1;
  });
}
