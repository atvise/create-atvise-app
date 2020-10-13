import type { Plugin } from 'rollup';
import { fetchCachedResponse, fetchCached } from '../fetchCached';

export const isUrl = (id: string) => id.startsWith('https:') || id.startsWith('http:');
export const isFile = (id: string) => /\.[a-z]+$/.test(id);

async function resolvePackageEntry(base: string) {
  const manifest = await fetchCached(`${base}/package.json`, (r) => r.json());
  return manifest.module || manifest.main;
}

type Entry = {
  entry: string;
  global: string;
};

type ResolvedEntry = Entry & { url: string };

export default function cdnjs({
  packagesUrl,
  entries = {},
}: {
  packagesUrl: string;
  entries?: { [id: string]: { entry: string; global: string } };
}) {
  const globals: { [url: string]: string } = {};

  // Populate urls
  for (const [name, entry] of Object.entries(entries)) {
    const url = new URL(entry.entry, `${packagesUrl}/${name}/`).href;
    (entry as ResolvedEntry).url = url;
    globals[url] = entry.global;
  }

  return {
    name: 'cdnjs',
    async resolveId(id, importer) {
      let url: string;

      console.log('Resolving', id, 'from', importer);

      if (entries[id]) {
        return { id: (entries[id] as ResolvedEntry).url, external: true };
      } else if (isUrl(id)) {
        url = id;
      } else if (id.startsWith('.')) {
        if (!importer) return null;

        url = new URL(id, isFile(importer) ? importer : `${importer}/`).href;
      } else {
        url = `${packagesUrl}/${id}`;
        if (id.match(/\//) && !id.match(/^@[^/]+\/[^/]+$/)) {
          // Got a path for an id, no need to load package.json
          // url = base;
        } else {
          const entry = await resolvePackageEntry(url);

          if (entry) {
            url = new URL(entry, `${url}/`).href;
          }
        }
      }

      if (!isFile(url)) {
        try {
          return (await fetchCachedResponse(url)).url;
        } catch (error) {
          throw new Error(
            `Unable to resolve '${id}' from '${importer}': ${error.message} (${
              error.url || 'no url'
            })`
          );
        }
      }

      return url;
    },
    outputOptions: (options) => ({
      ...options,
      globals: { ...globals, ...(options.globals || {}) },
    }),
    load: async (id) => {
      let url = id;

      if (!isUrl(id)) {
        console.warn('Not a url', id);
        url = `${packagesUrl}/${id}`;
      }

      return fetchCached(url, (r) => r.text());
    },
  } as Plugin;
}
