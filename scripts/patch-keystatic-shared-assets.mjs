import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = 'src/assets/article-images';
const marker = 'iceaxing-keystatic-shared-images:v1';

/** Share immutable image objects across articles; retain them on edit/delete. */
export async function patchSharedArticleAssets(distDirectory) {
  for (const name of await readdir(distDirectory)) {
    if (!name.endsWith('.js')) continue;
    const filename = path.join(distDirectory, name);
    let source = await readFile(filename, 'utf8');
    if (source.includes(marker)) continue;
    let changed = false;
    const replace = (search, replacement) => {
      if (!source.includes(search))
        throw new Error(`Missing shared image patch point in ${name}: ${search}`);
      source = source.replace(search, () => replacement);
      changed = true;
    };
    if (source.includes('function getDirectoriesForTreeKey(schema, directory, slug, format) {')) {
      replace(
        'directories.push(directory + toAdd);',
        `directories.push(directory === '${directory}' ? directory : directory + toAdd);`,
      );
    }
    if (source.includes('...directoriesUsedInSchema.map(x => `${x}/${slug}`)')) {
      replace(
        '...directoriesUsedInSchema.map(x => `${x}/${slug}`)',
        `...directoriesUsedInSchema.map(x => x === '${directory}' ? x : \`\${x}/\${slug}\`)`,
      );
    }
    if (name === 'keystatic-core-ui.js') {
      replace(
        'const dirFiles = new TrackedMap(relativePath => usedFiles.add(start + relativePath));',
        `const dirFiles = new TrackedMap(relativePath => { if (dir !== '${directory}') usedFiles.add(start + relativePath); });`,
      );
      replace(
        'const start = `${dir}${((_args$slug = args.slug)',
        `const start = dir === '${directory}' ? dir + '/' : \`\${dir}\${((_args$slug = args.slug)`,
      );
      replace(
        'file.parent ? args.slug ? `${file.parent}/${args.slug.value}` : file.parent : args.basePath',
        `file.parent === '${directory}' ? file.parent : file.parent ? args.slug ? \`\${file.parent}/\${args.slug.value}\` : file.parent : args.basePath`,
      );
    }
    if (changed) await writeFile(filename, `/* ${marker} */\n${source}`);
  }
}
