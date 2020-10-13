import type { ReplFile } from '../components/repl';
import basic from './basic';
import chart from './chart';

export type Example = {
  name: string;
  files: ReplFile[];
};

export default [basic, chart] as Example[];
