import * as scripts from './scripts';

const scriptRunner = (script: scripts.Script) => (
  options?: Partial<scripts.ScriptRunnerOptions>
) => {
  // FIXME: Lazy-load script modules
  return script.run({
    info: console.info,
    warn: console.warn,
    ...options,
  });
};

export const deploy = scriptRunner(scripts.deploy);
export const prepare = scriptRunner(scripts.prepare);
