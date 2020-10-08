import { transform } from '@babel/standalone';
import type { Plugin } from 'rollup';

export default function babel({ include }: { include: (id: string) => boolean }) {
  return {
    name: 'babel',
    transform(source, id) {
      if (!include(id)) return null;

      const result = transform(source, { presets: ['react', ['env', { modules: false }]] });
      return { code: result.code!, map: result.map! };
    },
  } as Plugin;
}
