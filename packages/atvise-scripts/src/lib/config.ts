import merge from 'deepmerge';
import { Atviserc } from '../types/Atviserc';

export type FullAtviserc = Required<Atviserc> & {
  port: Required<Atviserc['port']>;
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

export async function load({
  dir = process.cwd(),
  name = '.atviserc.json',
  path = `${dir}/${name}`,
} = {}): Promise<Config> {
  const raw: Atviserc = await import(path);

  return normalize(merge(defaults, raw) as FullAtviserc);
}
