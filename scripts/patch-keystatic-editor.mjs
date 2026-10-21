import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { patchKeystaticImages } from './patch-keystatic-images.mjs';
import { patchSharedArticleAssets } from './patch-keystatic-shared-assets.mjs';
import { patchKeystaticMath } from './patch-keystatic-math.mjs';

const PATCH_MARKER = 'iceaxing-keystatic-editor-patch:v3';
const LEGACY_PATCH_MARKER = 'iceaxing-keystatic-editor-patch:v1';
const PREVIOUS_PATCH_MARKER = 'iceaxing-keystatic-editor-patch:v2';
const SUPPORTED_VERSION = '0.6.9';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = path.join(root, 'node_modules', '@keystatic', 'core');
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

if (packageJson.version !== SUPPORTED_VERSION) {
  throw new Error(
    `Keystatic editor patch supports @keystatic/core ${SUPPORTED_VERSION}, but ${packageJson.version} is installed. Review the upstream editor before updating the patch.`,
  );
}

const distDirectory = path.join(packageRoot, 'dist');
const bundleNames = (await readdir(distDirectory)).filter((name) =>
  /^index-[a-f0-9]+\.js$/.test(name),
);
let patchedBundles = 0;

const replaceOnce = (source, search, replacement, label) => {
  const firstIndex = source.indexOf(search);
  if (firstIndex === -1) {
    throw new Error(`Unable to find the ${label} patch point in the Keystatic bundle.`);
  }
  if (source.indexOf(search, firstIndex + search.length) !== -1) {
    throw new Error(`Found more than one ${label} patch point in the Keystatic bundle.`);
  }
  return source.replace(search, () => replacement);
};

for (const bundleName of bundleNames) {
  const bundlePath = path.join(distDirectory, bundleName);
  let source = await readFile(bundlePath, 'utf8');
  if (source.includes(PATCH_MARKER)) {
    patchedBundles += 1;
    continue;
  }
  if (source.includes(LEGACY_PATCH_MARKER)) {
    source = source.replace(LEGACY_PATCH_MARKER, PATCH_MARKER);
    source = replaceOnce(
      source,
      String.raw`pattern: /^\$\$([^$\n]+)\$\$/`,
      String.raw`pattern: /^\$\$\s*(\S(?:.*\S)?)\s*\$\$/`,
      'legacy block math input rule',
    );
    source = replaceOnce(
      source,
      String.raw`pattern: /(?:^|[^\\$])\$(?!\$)([^$\n]+)\$/`,
      String.raw`pattern: /(?:^|[^\\$])\$(?!\$)\s*(\S(?:[^$\n]*?\S)?)\s*\$/`,
      'legacy inline math input rule',
    );
    source = source.replace(
      'handler: (state, [, expression], _start, end) => {\n        const start = end - expression.length - 2;',
      () =>
        "handler: (state, match, matchStart, end) => {\n        const expression = match[1];\n        const start = matchStart + match[0].indexOf('$');",
    );
    source = source.replaceAll(
      'value: { ...defaultProps.value, expression }',
      'value: { ...defaultProps.value, expression: expression.trim() }',
    );
    source = replaceOnce(
      source,
      `      }))).then(images => {
        insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
          type: 'image',
          src: {
            content: images[0].data,
            filename: images[0].name
          },
          alt: '',
          title: '',
          children: [{
            text: ''
          }]
        });
      });`,
      `      }))).then(images => {
        const nodes = images.map(image => ({
          type: 'image',
          src: { content: image.data, filename: image.name },
          alt: '',
          title: '',
          children: [{ text: '' }]
        }));
        insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes);
      });`,
      'multi-image paste handler',
    );
    await writeFile(bundlePath, source);
    patchedBundles += 1;
    continue;
  }
  if (source.includes(PREVIOUS_PATCH_MARKER)) {
    source = replaceOnce(
      source,
      `/* ${PREVIOUS_PATCH_MARKER} */`,
      `/* ${PATCH_MARKER} */`,
      'previous patch marker',
    );
    source = replaceOnce(
      source,
      `      }))).then(images => {
        insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
          type: 'image',
          src: {
            content: images[0].data,
            filename: images[0].name
          },
          alt: '',
          title: '',
          children: [{
            text: ''
          }]
        });
      });`,
      `      }))).then(images => {
        const nodes = images.map(image => ({
          type: 'image',
          src: { content: image.data, filename: image.name },
          alt: '',
          title: '',
          children: [{ text: '' }]
        }));
        insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes);
      });`,
      'multi-image paste handler',
    );
    await writeFile(bundlePath, source);
    patchedBundles += 1;
    continue;
  }
  if (
    !source.includes('function insertTable(tableType) {') ||
    !source.includes('const Toolbar = /*#__PURE__*/memo(function Toolbar(props) {')
  ) {
    continue;
  }

  source = replaceOnce(
    source,
    `function insertTable(tableType) {
  const rowType = tableType.contentMatch.defaultType;
  const cellType = rowType.contentMatch.defaultType;
  const headerType = getEditorSchema(tableType.schema).nodes.table_header;
  return (state, dispatch) => {
    const header = headerType.createAndFill();
    const cell = cellType.createAndFill();
    const headerRow = rowType.create(undefined, [header, header, header]);
    const row = rowType.create(undefined, [cell, cell, cell]);
    dispatch === null || dispatch === void 0 || dispatch(state.tr.replaceSelectionWith(tableType.create(undefined, [headerRow, row, row])));
    return true;
  };
}`,
    `/* ${PATCH_MARKER} */
function insertTable(tableType, rowCount = 3, columnCount = 3) {
  const rowType = tableType.contentMatch.defaultType;
  const cellType = rowType.contentMatch.defaultType;
  const headerType = getEditorSchema(tableType.schema).nodes.table_header;
  return (state, dispatch) => {
    const headerRow = rowType.create(undefined, Array.from({ length: columnCount }, () => headerType.createAndFill()));
    const bodyRows = Array.from({ length: Math.max(0, rowCount - 1) }, () => rowType.create(undefined, Array.from({ length: columnCount }, () => cellType.createAndFill())));
    dispatch === null || dispatch === void 0 || dispatch(state.tr.replaceSelectionWith(tableType.create(undefined, [headerRow, ...bodyRows])));
    return true;
  };
}`,
    'table insertion command',
  );

  source = replaceOnce(
    source,
    'const Toolbar = /*#__PURE__*/memo(function Toolbar(props) {',
    `function TableSizePickerButton({ tableType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState({ rows: 3, columns: 3 });
  const runCommand = useEditorDispatchCommand();
  const close = () => setIsOpen(false);
  const insert = (rows, columns) => {
    close();
    runCommand(insertTable(tableType, rows, columns));
  };
  const cells = Array.from({ length: 100 }, (_, index) => {
    const row = Math.floor(index / 10) + 1;
    const column = index % 10 + 1;
    const isActive = row <= size.rows && column <= size.columns;
    return /*#__PURE__*/jsx("button", {
      type: "button",
      "aria-label": \`\${row} 行 × \${column} 列\`,
      title: \`\${row} × \${column}\`,
      className: css({
        width: 24,
        height: 24,
        padding: 0,
        border: \`1px solid \${isActive ? tokenSchema.color.alias.borderSelected : tokenSchema.color.alias.borderIdle}\`,
        borderRadius: tokenSchema.size.radius.small,
        backgroundColor: isActive ? tokenSchema.color.alias.backgroundSelected : tokenSchema.color.alias.backgroundIdle,
        cursor: "pointer",
        "&:hover, &:focus-visible": {
          outline: \`2px solid \${tokenSchema.color.alias.borderSelected}\`,
          outlineOffset: 1
        }
      }),
      onMouseEnter: () => setSize({ rows: row, columns: column }),
      onFocus: () => setSize({ rows: row, columns: column }),
      onClick: () => insert(row, column)
    }, \`\${row}-\${column}\`);
  });
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs(TooltipTrigger, {
      children: [/*#__PURE__*/jsx(EditorToolbarButton, {
        "aria-label": "Table",
        onPress: () => setIsOpen(true),
        children: /*#__PURE__*/jsx(Icon, { src: tableIcon })
      }), /*#__PURE__*/jsx(Tooltip, {
        children: /*#__PURE__*/jsx(Text, { children: "Table" })
      })]
    }), /*#__PURE__*/jsx(DialogContainer, {
      onDismiss: close,
      children: isOpen && /*#__PURE__*/jsxs(Dialog, {
        children: [/*#__PURE__*/jsx(Heading, { children: "插入表格" }), /*#__PURE__*/jsxs(Text, {
          children: [size.rows, " 行 × ", size.columns, " 列（最多 10 × 10）"]
        }), /*#__PURE__*/jsx("div", {
          role: "grid",
          "aria-label": "选择表格行列数",
          className: css({
            display: "grid",
            gridTemplateColumns: "repeat(10, 24px)",
            gap: 4,
            marginTop: tokenSchema.size.space.large
          }),
          children: cells
        })]
      })
    })]
  });
}
const Toolbar = /*#__PURE__*/memo(function Toolbar(props) {`,
    'table size picker component',
  );

  source = replaceOnce(
    source,
    `nodes.table && /*#__PURE__*/jsxs(TooltipTrigger, {
            children: [/*#__PURE__*/jsx(ToolbarButton, {
              "aria-label": "Table",
              command: insertTable(nodes.table),
              children: /*#__PURE__*/jsx(Icon, {
                src: tableIcon
              })
            }), /*#__PURE__*/jsx(Tooltip, {
              children: /*#__PURE__*/jsx(Text, {
                children: "Table"
              })
            })]
          })`,
    `nodes.table && /*#__PURE__*/jsx(TableSizePickerButton, {
            tableType: nodes.table
          })`,
    'table toolbar button',
  );

  source = replaceOnce(
    source,
    `  for (const [markName, shortcuts] of simpleMarkShortcuts) {`,
    `  if (nodes.math) {
    rules.push({
      pattern: /^\\$\\$\\s*(\\S(?:.*\\S)?)\\s*\\$\\$$/,
      handler: (state, [, expression], start, end) => {
        const $start = state.doc.resolve(start);
        if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodes.math)) return null;
        const defaultProps = nodes.math.defaultAttrs.props;
        const attrs = {
          props: {
            ...defaultProps,
            value: { ...defaultProps.value, expression: expression.trim() }
          }
        };
        return state.tr.delete(start, end).replaceSelectionWith(nodes.math.createAndFill(attrs));
      }
    });
  }
  if (nodes.inlineMath) {
    rules.push({
      pattern: /(?:^|[^\\\\$])\\$(?!\\$)\\s*(\\S(?:[^$\\n]*?\\S)?)\\s*\\$$/,
      handler: (state, match, matchStart, end) => {
        const expression = match[1];
        const start = matchStart + match[0].indexOf('$');
        const defaultProps = nodes.inlineMath.defaultAttrs.props;
        const attrs = {
          props: {
            ...defaultProps,
            value: { ...defaultProps.value, expression: expression.trim() }
          }
        };
        return state.tr.replaceWith(start, end, nodes.inlineMath.create(attrs));
      }
    });
  }
  for (const [markName, shortcuts] of simpleMarkShortcuts) {`,
    'math input rules',
  );

  await writeFile(bundlePath, source);
  patchedBundles += 1;
}

if (patchedBundles !== 1) {
  throw new Error(`Expected to patch one Keystatic editor bundle, found ${patchedBundles}.`);
}

console.log(`Keystatic editor enhancements are active (${PATCH_MARKER}).`);

for (const bundleName of bundleNames) {
  const bundlePath = path.join(distDirectory, bundleName);
  const source = await readFile(bundlePath, 'utf8');
  if (source.includes(PATCH_MARKER)) {
    await patchKeystaticImages(bundlePath);
    await patchKeystaticMath(bundlePath);
  }
}
await patchSharedArticleAssets(distDirectory);
// Validate generated JavaScript, including installs that reused cached patched bundles.
for (const name of await readdir(distDirectory)) {
  if (!name.endsWith('.js')) continue;
  const bundlePath = path.join(distDirectory, name);
  const source = await readFile(bundlePath, 'utf8');
  if (!source.includes('iceaxing-keystatic-')) continue;
  execFileSync(process.execPath, ['--check', bundlePath], { stdio: 'pipe' });
}
console.log('Keystatic article images use shared content-addressed Git assets.');
