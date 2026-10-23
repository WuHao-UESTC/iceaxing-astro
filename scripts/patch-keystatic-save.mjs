import { readFile, writeFile } from 'node:fs/promises';

const marker = 'iceaxing-keystatic-preserve-save:v1';

// Keep the live editor value only when this instance saved the exact tree now
// being received. Other entry changes and explicit resets still use disk data.
export async function patchKeystaticSave(bundlePath) {
  let source = await readFile(bundlePath, 'utf8');
  if (source.includes(marker)) return;
  const replaceOnce = (search, replacement) => {
    if (source.indexOf(search) === -1 || source.indexOf(search) !== source.lastIndexOf(search)) {
      throw new Error(`Unable to locate a unique Keystatic save patch point: ${search}`);
    }
    source = source.replace(search, () => replacement);
  };
  for (const name of ['LocalItemPage', 'LocalSingletonPage']) {
    replaceOnce(
      `function ${name}(props) {`,
      `function ${name}(props) {\n  const savedLocalTreeKey = useRef(null);`,
    );
    const start = source.indexOf(`function ${name}(props) {`);
    const end = source.indexOf('\nfunction ', start + 1);
    const before = source.slice(0, start);
    let body = source.slice(start, end);
    const after = source.slice(end);
    if (end < 0 || !body.includes('currentLocalTreeKey: localTreeKey,')) {
      throw new Error(`Unable to locate ${name} save arguments.`);
    }
    body = body.replace(
      'currentLocalTreeKey: localTreeKey,',
      'currentLocalTreeKey: localTreeKey,\n      savedLocalTreeKey,',
    );
    const value =
      name === 'LocalItemPage'
        ? 'initialState'
        : 'initialState === null ? getInitialPropsValue(schema) : initialState';
    const reset = body.indexOf('if (localTreeKeyInState !== localTreeKey) {');
    const resetEnd = body.indexOf('\n  }', reset);
    if (reset < 0 || resetEnd < 0 || !body.slice(reset, resetEnd).includes(`state: ${value}`)) {
      throw new Error(`Unable to locate ${name} state reconciliation.`);
    }
    body =
      body.slice(0, reset) +
      body
        .slice(reset, resetEnd)
        .replace(
          `state: ${value}`,
          `state: savedLocalTreeKey.current === localTreeKey ? state : (${value})`,
        ) +
      body.slice(resetEnd);
    source = before + body + after;
  }
  replaceOnce(
    `tree: tree_0
        } = await hydrateTreeCacheWithEntries(newTree);
        setTreeSha(await treeSha(tree_0));`,
    `tree: tree_0
        } = await hydrateTreeCacheWithEntries(newTree);
        const nextTreeSha = await treeSha(tree_0);
        if (args.savedLocalTreeKey) {
          args.savedLocalTreeKey.current = getTreeKey(getDirectoriesForTreeKey(object(args.schema), args.basePath, args.slug?.value, args.format), tree_0);
        }
        React.startTransition(() => setTreeSha(nextTreeSha));`,
  );
  await writeFile(bundlePath, `/* ${marker} */\n${source}`);
}
