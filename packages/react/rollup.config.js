import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { peerDependencies } from './package.json';

export default {
  input: ['./src/index.ts'],
  external: [...builtinModules, ...Object.keys(peerDependencies)],
  plugins: [
    resolve(),
    typescript({
      declaration: true,
      declarationDir: 'out/types/',
      rootDir: 'src/',
    }),
  ],
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
