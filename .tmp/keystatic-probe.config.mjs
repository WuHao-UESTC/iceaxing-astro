import base from '../astro.config.mjs';
import {fileURLToPath} from 'node:url';
export default {
  ...base,
  root: fileURLToPath(new URL('../', import.meta.url)),
  cacheDir: './.tmp/keystatic-probe-astro',
  vite: {...base.vite, cacheDir: '.tmp/keystatic-probe-vite'},
};
