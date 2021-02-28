import { promises } from 'fs';

/* eslint-disable import/prefer-default-export */
async function readJson(path) {
  return JSON.parse(await promises.readFile(path, 'utf8'));
}

export { readJson as r };
