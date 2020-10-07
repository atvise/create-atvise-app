/* eslint-disable import/prefer-default-export */

import { promises as fsp } from 'fs';

export async function readJson(path: string) {
  return JSON.parse(await fsp.readFile(path, 'utf8'));
}
