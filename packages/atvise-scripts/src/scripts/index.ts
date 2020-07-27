import * as deployMetadata from './deploy';
import * as prepareMetadata from './prepare';
import * as initMetadata from './init';

type HookReturnValue<R> = R | Promise<R>;
type InteractiveHook<R> = () => HookReturnValue<R>;

export type ConfirmHook = (message: string) => HookReturnValue<boolean>;

export interface ScriptRunnerOptions {
  info: (message: string) => void;
  warn: (warning: string) => void;
  progress?: (status: string) => void;
  doInteractive: <R>(fn: InteractiveHook<R>, fallback: R) => HookReturnValue<R>;
  confirm: ConfirmHook;
}

export type ScriptAction = (options: ScriptRunnerOptions) => HookReturnValue<void>;

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

export const init: Script = {
  ...initMetadata,
  run: lazyRun(() => import('./run/init')),
};
