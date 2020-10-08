import { rollup, RollupCache, OutputChunk } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import type { ReplFile } from '../components/repl';
import babel from './plugins/babel';
import replRuntime, { inputId, isReplFile } from './plugins/repl-runtime';
import cdnjs from './plugins/cdnjs';

export type BundlerResult = {
  bundle: OutputChunk;
  stats: { duration: number };
};

export const aborted = new Error('Aborted');

export default class Bundler {
  private rollupCache?: RollupCache;

  constructor(private packagesUrl = 'https://unpkg.com') {}

  private currentBuildId = 0;

  async bundle(files: ReplFile[]) {
    const id = ++this.currentBuildId;
    const start = Date.now();

    const abort = () => {
      if (id !== this.currentBuildId) {
        throw aborted;
      }
    };

    abort();

    const getSourceFile = (id: string) => files.find((f) => `./${f.name}` === id);
    console.log({ files });

    // await new Promise((resolve) => setTimeout(resolve, 500));

    const bundle = await rollup({
      input: inputId,
      cache: this.rollupCache,
      onwarn: (warning) => {
        console.warn(warning);
        // warnings.push(warning),
      },
      plugins: [
        {
          name: 'cancel',
          resolveId() {
            abort();
            return null;
          },
          load() {
            abort();
            return null;
          },
        },

        replRuntime(files[0]),
        {
          name: 'repl-files',
          resolveId(id) {
            return getSourceFile(id) ? id : null;
          },
          load(id) {
            return getSourceFile(id)?.contents || null;
          },
        },
        replace({
          values: {
            'process.env.NODE_ENV': '"production"',
          },
        }),
        commonjs({}),
        cdnjs({
          packagesUrl: this.packagesUrl,
          entries: {
            react: { entry: 'umd/react.production.min.js', global: 'React' },
            'react-dom': { entry: 'umd/react-dom.production.min.js', global: 'ReactDOM' },
            '@material-ui/core': {
              entry: 'umd/material-ui.production.min.js',
              global: 'MaterialUI',
            },
            victory: { entry: 'dist/victory.min.js', global: 'Victory' },
          },
        }),
        babel({
          include: (id) => !!getSourceFile(id) || isReplFile(id),
        }),
      ],
    });

    abort();

    this.rollupCache = bundle.cache;

    const {
      output: [chunk],
    } = await bundle.generate({
      format: 'iife',
      name: 'replApp',
    });

    abort();

    return {
      id,
      bundle: chunk,
      stats: {
        duration: Date.now() - start,
      },
    };
  }
}
