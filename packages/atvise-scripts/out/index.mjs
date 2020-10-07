import { p as prepare$1, d as deploy$1 } from './index-e6ccd97b.mjs';

const scriptRunner = script => options => {
  // FIXME: Lazy-load script modules
  return script.run({
    info: console.info,
    warn: console.warn,
    ...options
  });
};

const deploy = scriptRunner(deploy$1);
const prepare = scriptRunner(prepare$1);

export { deploy, prepare };
