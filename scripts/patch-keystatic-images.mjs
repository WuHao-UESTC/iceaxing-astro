import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const marker = 'iceaxing-keystatic-git-images:v2';

// Replace entire lines so installs cached from the corrupted v1 template are repaired too.
const repairImageMessages = (source) => {
  const start = source.indexOf('function insertArticleImages(view, files, dropPosition) {');
  const end = source.indexOf('function imageDropPlugin(schema) {', start);
  if (start < 0 || end < 0)
    throw new Error('Unable to locate the image helper for message repair.');
  const helper = source
    .slice(start, end)
    .replace(
      /^.*status\.textContent = .*$/m,
      "        status.textContent = '正在处理图片 ' + (index + 1) + '/' + images.length + '，完成后再保存文章…';",
    )
    .replace(
      /^.*if \(!result\) throw new Error\(.*$/m,
      "        if (!result) throw new Error('图片格式不受支持。');",
    )
    .replace(
      /^.*window\.alert\(error instanceof Error.*$/m,
      "      window.alert(error instanceof Error ? error.message : '图片处理失败，请重试。');",
    );
  return source.slice(0, start) + helper + source.slice(end);
};

/** Patch the ProseMirror editor used by fields.markdoc, not the Slate editor. */
export async function patchKeystaticImages(bundlePath) {
  let source = await readFile(bundlePath, 'utf8');
  if (source.includes(marker)) return;
  const previousGitMarker = 'iceaxing-keystatic-git-images:v1';
  if (source.includes(previousGitMarker)) {
    await writeFile(bundlePath, repairImageMessages(source.replace(previousGitMarker, marker)));
    return;
  }
  const previousMarker = 'iceaxing-keystatic-r2-images:v1';
  if (source.includes(previousMarker)) {
    source = source
      .replace(previousMarker, marker)
      .replaceAll('remoteArticleUploads', 'articleImageTasks')
      .replaceAll('insertRemoteArticleImages', 'insertArticleImages')
      .replaceAll('schema.components.remoteImage', 'schema.components.articleImage')
      .replaceAll('schema.schema.nodes.remoteImage', 'schema.schema.nodes.articleImage')
      .replaceAll('正在上传图片', '正在处理图片')
      .replaceAll('图片上传失败', '图片处理失败');
    await writeFile(bundlePath, repairImageMessages(source));
    return;
  }
  const replace = (search, replacement, label) => {
    const scoped = ['clipboard images', 'dropped images'].includes(label);
    const start = scoped ? source.indexOf('function imageDropPlugin(schema) {') : 0;
    const end = scoped ? source.indexOf('function ImageToolbarButton()', start) : source.length;
    const index = source.indexOf(search, start);
    const duplicate = source.indexOf(search, index + search.length);
    if (index < start || index >= end || (duplicate >= 0 && duplicate < end))
      throw new Error(
        `Expected one Keystatic ${label} patch point in ${path.basename(bundlePath)}.`,
      );
    source = source.replace(search, () => replacement);
  };

  replace(
    'function imageDropPlugin(schema) {',
    `/* ${marker} */
const articleImageTasks = new WeakMap();
function insertArticleImages(view, files, dropPosition) {
  const schema = getEditorSchema(view.state.schema);
  const component = schema.components.articleImage;
  const images = Array.from(files || []).filter(file => file.type.startsWith('image/'));
  if (!component || !component.handleFile || !images.length) return false;
  let pending = articleImageTasks.get(view);
  if (!pending) articleImageTasks.set(view, pending = new Set());
  const upload = { bookmark: view.state.selection.getBookmark(), dropPosition };
  pending.add(upload);
  const status = document.createElement('div');
  status.setAttribute('role', 'status');
  status.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;background:#17212b;color:white;padding:12px 18px;border-radius:8px';
  document.body.append(status);
  (async () => {
    try {
      const nodes = [];
      for (const [index, file] of images.entries()) {
        status.textContent = '正在处理图片 ' + (index + 1) + '/' + images.length + '，完成后再保存文章…';
        const result = component.handleFile(file, view.props.config);
        if (!result) throw new Error('图片格式不受支持。');
        const value = await result;
        nodes.push(schema.schema.nodes.articleImage.createChecked({ props: toSerialized(value, component.schema) }));
      }
      if (view.isDestroyed) return;
      const transaction = view.state.tr;
      const slice = new Slice(Fragment$2.from(nodes), 0, 0);
      if (upload.dropPosition !== undefined) transaction.replaceRange(upload.dropPosition, upload.dropPosition, slice);
      else transaction.setSelection(upload.bookmark.resolve(view.state.doc)).replaceSelection(slice);
      view.dispatch(transaction.scrollIntoView());
    } catch (error) {
      window.alert(error instanceof Error ? error.message : '图片处理失败，请重试。');
    } finally {
      pending.delete(upload);
      status.remove();
    }
  })();
  return true;
}
function imageDropPlugin(schema) {`,
    'article image helper',
  );

  replace(
    `function imageDropPlugin(schema) {
  const imageType = schema.nodes.image;
  return new Plugin({
    props: {`,
    `function imageDropPlugin(schema) {
  const imageType = schema.nodes.image;
  return new Plugin({
    view(view) {
      return { destroy() { articleImageTasks.delete(view); } };
    },
    state: {
      init() { return null; },
      apply(transaction, value) {
        // Map pending insertion positions through edits made while uploading.
        // Upload sets are registered per editor document below.
        const pending = articleImageTasksByDoc.get(transaction.before);
        if (pending) {
          for (const upload of pending) {
            upload.bookmark = upload.bookmark.map(transaction.mapping);
            if (upload.dropPosition !== undefined) upload.dropPosition = transaction.mapping.map(upload.dropPosition);
          }
          articleImageTasksByDoc.set(transaction.doc, pending);
        }
        return value;
      }
    },
    props: {`,
    'upload position mapping',
  );
  replace(
    'const articleImageTasks = new WeakMap();',
    'const articleImageTasks = new WeakMap();\nconst articleImageTasksByDoc = new WeakMap();',
    'upload document map',
  );
  replace(
    '  pending.add(upload);',
    '  pending.add(upload);\n  articleImageTasksByDoc.set(view.state.doc, pending);',
    'upload position registration',
  );

  replace(
    `      handlePaste(view, event) {
        var _event$clipboardData;`,
    `      handlePaste(view, event) {
        if (insertArticleImages(view, event.clipboardData?.files)) return true;
        var _event$clipboardData;`,
    'clipboard images',
  );
  replace(
    `      handleDrop(view, event) {
        var _event$dataTransfer;`,
    `      handleDrop(view, event) {
        const remoteDropPosition = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        if (remoteDropPosition !== undefined && insertArticleImages(view, event.dataTransfer?.files, remoteDropPosition)) return true;
        var _event$dataTransfer;`,
    'dropped images',
  );
  replace(
    `              const schema = getEditorSchema(nodeType.schema);
              if (!file || !schema.config.image) return;`,
    `              const schema = getEditorSchema(nodeType.schema);
              if (file && insertArticleImages(view, [file])) return;
              if (!file || !schema.config.image) return;`,
    'insert menu image',
  );
  replace(
    `          const schema = getEditorSchema(view.state.schema);
          if (!file || !schema.config.image) {`,
    `          const schema = getEditorSchema(view.state.schema);
          if (file && insertArticleImages(view, [file])) return;
          if (!file || !schema.config.image) {`,
    'toolbar image',
  );

  await writeFile(bundlePath, repairImageMessages(source));
}
