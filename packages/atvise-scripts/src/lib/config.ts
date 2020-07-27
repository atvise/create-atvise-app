import merge from 'deepmerge';
import setupDebug from 'debug';
import writeJsonFile from 'write-json-file';
import { Atviserc } from '../types/Atviserc';
import type { ConfirmHook } from '../scripts';
import { AppError } from './errors';

const debug = setupDebug('config');

export type FullAtviserc = Required<Atviserc> & {
  port: Required<Atviserc['port']>;
  deploy: Required<Atviserc['deploy']>;
};

export type Config = FullAtviserc & {
  deploy: FullAtviserc['deploy'] & {
    outPath: string[];
  };
};

export const defaults: Config = {
  host: 'localhost',
  port: {
    opc: 4840,
    http: 80,
  },
  deploy: {
    outPath: ['out', 'build'],
  },
};

export function normalize(atviserc: FullAtviserc): Config {
  const deployOutPath = atviserc.deploy.outPath;
  return {
    ...atviserc,
    deploy: {
      ...atviserc.deploy,
      outPath: Array.isArray(deployOutPath) ? deployOutPath : [deployOutPath],
    },
  };
}

export const configName = '.atviserc.json';
export const schemaUrl =
  'https://lukashechenberger.github.io/create-atvise-app/schemas/atviserc.schema.json';

interface ConfigPathOptions {
  dir?: string;
  name?: string;
  path?: string;
}

interface LoadConfigOptions extends ConfigPathOptions {
  fallbackToDefaults?: boolean;
  confirmFallback?: ConfirmHook;
}

export async function load({
  dir = process.cwd(),
  name = configName,
  path = `${dir}/${name}`,
  fallbackToDefaults = false,
  confirmFallback,
}: LoadConfigOptions = {}): Promise<Config> {
  let raw: Atviserc;

  try {
    raw = await import(path);
    debug(`Loaded config from '${path}'`);
  } catch (error) {
    if (
      fallbackToDefaults ||
      (await confirmFallback?.(
        'Failed to load config file, do you want to continue with defaults?'
      ))
    )
      return defaults;

    throw AppError.from(error, 'Failed to load config file', {
      tips: ["Run 'npx atvise-scripts init' first"],
    });
  }

  return normalize(merge(defaults, raw) as FullAtviserc);
}

export async function write(
  atviserc: Atviserc,
  { dir = process.cwd(), name = configName, path = `${dir}/${name}` }: ConfigPathOptions = {}
) {
  await writeJsonFile(configName, {
    $schema: schemaUrl,
    ...atviserc,
  });

  debug(`Wrote config to '${path}'`);

  return { path };
}
