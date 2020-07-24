import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import addShebang from 'rollup-plugin-add-shebang';
import { dependencies, peerDependencies } from './package.json';

export default {
  input: ['./src/index.ts', './src/bin.ts'],
  external: [
    ...builtinModules,
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
    'atscm/api',
    // For the '--version' flag
    '../package.json',
  ],
  plugins: [resolve(), typescript(), babel({ extensions: ['.ts', '.js'] }), addShebang()],
  output: [
    {
      dir: './out',
      format: 'cjs',
    },
    {
      dir: './out',
      format: 'es',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
    },
  ],
};
