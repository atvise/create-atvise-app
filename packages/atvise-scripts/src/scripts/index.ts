export interface ScriptRunnerOptions {
  info: (message: string) => void;
  warn: (warning: string) => void;
  progress?: (status: string) => void;
  confirm?: (message: string) => boolean | Promise<boolean>;
}

export interface Script {
  name: string;
  description: string;
  run: (options: ScriptRunnerOptions) => void | Promise<void>;
}

export { default as deploy } from './deploy';
export { default as prepare } from './prepare';
