export interface ScriptRunnerOptions {
  warn: (warning: string) => void;
  progress?: (status: string) => void;
  confirm?: (message: string) => boolean | Promise<boolean>;
}

export interface Script {
  name: string;
  description: string;
  run: (options?: ScriptRunnerOptions) => void | Promise<void>;
}

export { default as deploy } from './deploy';
