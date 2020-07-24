import * as deployMetadata from './deploy';
import * as prepareMetadata from './prepare';

export interface ScriptRunnerOptions {
  info: (message: string) => void;
  warn: (warning: string) => void;
  progress?: (status: string) => void;
  confirm?: (message: string) => boolean | Promise<boolean>;
}

export type ScriptAction = (options: ScriptRunnerOptions) => void | Promise<void>;

export interface Script {
  name: string;
  description: string;
  run: ScriptAction;
}

const lazyRun = (importRun: () => Promise<{ default: ScriptAction }>) => async (
  options: ScriptRunnerOptions
) => {
  const { default: run } = await importRun();
  return run(options);
};

export const deploy: Script = {
  ...deployMetadata,
  run: lazyRun(() => import('./run/deploy')),
};

export const prepare: Script = {
  ...prepareMetadata,
  run: lazyRun(() => import('./run/prepare')),
};
