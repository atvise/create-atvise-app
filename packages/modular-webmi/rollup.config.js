import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: ['./src/index.ts'],
  external: [...builtinModules],
  plugins: [resolve(), typescript()],
  output: [
    {
      dir: './out',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: './out',
      format: 'es',
      entryFileNames: '[name].mjs',
      sourcemap: true,
    },
  ],
};
