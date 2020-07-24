import merge from 'deepmerge';
import { Atviserc } from '../types/Atviserc';

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

interface LoadConfigOptions {
  dir?: string;
  name?: string;
  path?: string;
  fallbackToDefaults?: boolean;
}

export async function load({
  dir = process.cwd(),
  name = '.atviserc.json',
  path = `${dir}/${name}`,
  fallbackToDefaults = false,
}: LoadConfigOptions = {}): Promise<Config> {
  let raw: Atviserc;

  try {
    raw = await import(path);
  } catch (error) {
    if (fallbackToDefaults) return defaults;

    throw error;
  }

  return normalize(merge(defaults, raw) as FullAtviserc);
}
