import { access, cp, mkdir, rm } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';

const source = resolve('dist/client/pagefind');
const staticRoot = resolve('.vercel/output/static');
const target = resolve(staticRoot, 'pagefind');

try {
  await access(staticRoot);
} catch {
  console.log('Vercel static output not found; Pagefind remains in dist/client/pagefind.');
  process.exit(0);
}

const targetRelativeToStaticRoot = relative(staticRoot, target);
if (
  !targetRelativeToStaticRoot ||
  targetRelativeToStaticRoot.startsWith(`..${sep}`) ||
  targetRelativeToStaticRoot === '..'
) {
  throw new Error('Refusing to replace a Pagefind directory outside the Vercel static output.');
}

await rm(target, { recursive: true, force: true });
await mkdir(dirname(target), { recursive: true });
await cp(source, target, { recursive: true });

console.log('Copied Pagefind assets into .vercel/output/static/pagefind.');
