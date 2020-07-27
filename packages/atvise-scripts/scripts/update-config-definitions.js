/* eslint-disable import/no-commonjs */

const { promises: fsp } = require('fs');
const { compileFromFile } = require('json-schema-to-typescript');
const style = require('../../../.prettierrc.json');

const bannerComment = `/*
 * This file was automatically generated from the json schema at
 * 'package/atvise-scripts/atviserc.schema.json'.
 *
 * Do not modify it directly, instead update the schema and run
 * 'node scripts/update-config-definition' to re-generated it.
 */`;

async function generate() {
  const definitions = await compileFromFile('../../schemas/atviserc.schema.json', {
    bannerComment,
    style,
  });
  await fsp.writeFile('src/types/Atviserc.ts', definitions);
}

generate().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = process.exitCode || 1;
});
