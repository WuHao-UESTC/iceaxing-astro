import type { fields } from '@keystatic/core';
import { Plugin, PluginKey, TextSelection, type EditorState } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { currentWikiTargets, editorWikiLocale, loadWikiTargets } from './wikilink-catalog';
import {
  findWikiLinks,
  escapeLiteralWikiLinks,
  normalizeWikiLinks,
  parseWikiLink,
  resolveWikiTarget,
  searchWikiTargets,
  type WikiLinkTarget,
  type WikiLinkValue,
} from './wikilinks';

type MarkdocField = ReturnType<typeof fields.markdoc>;
interface Query {
  from: number;
  to: number;
  text: string;
}
interface MenuState {
  query?: Query;
  dismissed?: string;
}
const key = new PluginKey<MenuState>('iceaxing-wikilinks');
let menuId = 0;

function wikiEnabled(state: EditorState) {
  return (
    !state.selection.$from.parent.type.spec.code &&
    !(state.storedMarks ?? state.selection.$from.marks()).some(
      (mark) => mark.type.spec.code || mark.type.name === 'code' || mark.type.name === 'link',
    )
  );
}

export function wikiQuery(state: EditorState): Query | undefined {
  const { $from, empty } = state.selection;
  if (!empty || !$from.parent.isTextblock || !wikiEnabled(state)) return;
  const text = $from.parent.textBetween(0, $from.parentOffset, '\n', '\ufffc');
  const match = text.match(/\[\[([^[\]\n\ufffc]{0,300})$/);
  if (!match || match.index === undefined) return;
  let slashes = 0;
  for (let at = match.index - 1; text[at] === '\\'; at--) slashes++;
  if (slashes % 2 || text[match.index - 1] === '!') return;
  return { from: $from.start() + match.index, to: state.selection.from, text: match[1]! };
}

function nodeForWikiLink(state: EditorState, value: WikiLinkValue) {
  const type = state.schema.nodes.wikiLink;
  if (!type) return;
  const props = type.createAndFill()?.attrs.props;
  if (!props) return;
  return type.createAndFill({ props: { ...props, value: { ...props.value, ...value } } });
}

/** Canonicalize existing references without reinterpreting escaped literal text. */
export function preserveEditorWikiLinks(
  state: EditorState,
  targets = currentWikiTargets(),
): EditorState {
  const edits: Array<{ from: number; to: number; value: WikiLinkValue }> = [];
  state.doc.descendants((node, position) => {
    if (node.type.name === 'wikiLink') {
      const value = node.attrs.props.value as WikiLinkValue;
      const resolved = resolveWikiTarget(value.target, targets, editorWikiLocale());
      if (resolved && resolved.id !== value.target)
        edits.push({
          from: position,
          to: position + node.nodeSize,
          value: { ...value, target: resolved.id },
        });
      return false;
    }
  });
  const tr = state.tr;
  for (const edit of edits.sort((a, b) => b.from - a.from)) {
    const node = nodeForWikiLink(state, edit.value);
    if (node) tr.replaceWith(edit.from, edit.to, node);
  }
  return tr.docChanged ? state.apply(tr) : state;
}

export function wikiLinkPlugin() {
  const id = `keystatic-wikilinks-${++menuId}`;
  let items: WikiLinkTarget[] = [];
  let selected = 0;
  let repaint = () => {};
  const activeQuery = (state: EditorState) => {
    const value = key.getState(state);
    return value?.query && value.dismissed !== `${value.query.from}:${value.query.text}`
      ? value.query
      : undefined;
  };
  const insert = (view: EditorView, target: WikiLinkTarget) => {
    const query = activeQuery(view.state);
    if (!query) return;
    const syntax = parseWikiLink(`[[${query.text}]]`);
    const node = nodeForWikiLink(view.state, {
      target: target.id,
      label: syntax?.label ?? '',
      anchor: syntax?.anchor ?? '',
    });
    if (!node) return;
    const tr = view.state.tr.replaceWith(query.from, query.to, node);
    tr.setSelection(TextSelection.near(tr.doc.resolve(query.from + node.nodeSize)));
    view.dispatch(tr.scrollIntoView());
    view.focus();
  };
  return new Plugin<MenuState>({
    key,
    appendTransaction(transactions, _oldState, state) {
      if (
        !transactions.some((tr) => tr.docChanged) ||
        transactions.some(
          (tr) =>
            tr.getMeta('paste') ||
            tr.getMeta('uiEvent') === 'paste' ||
            tr.getMeta('composition') !== undefined,
        )
      )
        return null;
      const { $from, empty } = state.selection;
      if (!empty || !$from.parent.isTextblock || !wikiEnabled(state)) return null;
      const text = $from.parent.textBetween(0, $from.parentOffset, '\n', '\ufffc');
      if (!text.endsWith(']]')) return null;
      const span = findWikiLinks(text).findLast((link) => link.to === text.length);
      if (!span) return null;
      const resolved = resolveWikiTarget(span.target, currentWikiTargets(), editorWikiLocale());
      const node = nodeForWikiLink(state, {
        target: resolved?.id ?? span.target,
        label: span.label,
        anchor: span.anchor,
      });
      if (!node) return null;
      return state.tr
        .replaceWith($from.start() + span.from, state.selection.from, node)
        .scrollIntoView();
    },
    state: {
      init: (_, state) => ({ query: wikiQuery(state) }),
      apply: (tr, previous, _oldState, state) => {
        const query = wikiQuery(state);
        return {
          query,
          dismissed:
            tr.getMeta(key) === 'dismiss' && query
              ? `${query.from}:${query.text}`
              : previous.dismissed,
        };
      },
    },
    props: {
      attributes(state): Record<string, string> {
        return activeQuery(state)
          ? { 'aria-controls': id, 'aria-expanded': 'true', 'aria-autocomplete': 'list' }
          : {};
      },
      handleKeyDown(view, event) {
        if (event.isComposing || !activeQuery(view.state)) return false;
        if (event.key === 'Escape') {
          view.dispatch(view.state.tr.setMeta(key, 'dismiss'));
          return true;
        }
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && items.length) {
          selected =
            (selected + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
          repaint();
          return true;
        }
        if (event.key === 'Enter' && items[selected]) {
          insert(view, items[selected]!);
          return true;
        }
        return false;
      },
      transformPastedText(text, _plain, view) {
        return !wikiEnabled(view.state) ? text : normalizeWikiLinks(text);
      },
      handlePaste(view, event) {
        const text = event.clipboardData?.getData('text/plain') ?? '';
        const html = event.clipboardData?.getData('text/html') ?? '';
        if (
          !wikiEnabled(view.state) ||
          html.includes('data-pm-slice') ||
          !html ||
          !findWikiLinks(text).length
        )
          return false;
        view.pasteText(text);
        return true;
      },
    },
    view(view) {
      const doc = view.dom.ownerDocument;
      const win = doc.defaultView!;
      const menu = doc.createElement('div');
      menu.id = id;
      menu.role = 'listbox';
      menu.setAttribute('aria-label', '选择 WikiLink 目标文章');
      menu.style.cssText =
        'position:fixed;z-index:10000;max-height:320px;overflow:auto;width:min(360px,calc(100vw - 24px));padding:6px;border:1px solid GrayText;border-radius:8px;background:Canvas;color:CanvasText;box-shadow:0 8px 30px #0003;font:14px/1.5 system-ui;';
      let destroyed = false;
      let session: number | undefined;
      let previousText = '';
      let loading = false;
      let error = '';
      const position = () => {
        if (!menu.isConnected) return;
        const query = activeQuery(view.state);
        if (!query) return;
        const coords = view.coordsAtPos(query.to);
        menu.style.left = `${Math.max(12, Math.min(coords.left, win.innerWidth - menu.offsetWidth - 12))}px`;
        menu.style.top = `${Math.max(8, coords.bottom + 6 + menu.offsetHeight < win.innerHeight ? coords.bottom + 6 : coords.top - menu.offsetHeight - 6)}px`;
      };
      const render = () => {
        if (destroyed) return;
        const query = activeQuery(view.state);
        if (!query) {
          menu.remove();
          view.dom.removeAttribute('aria-activedescendant');
          session = undefined;
          items = [];
          return;
        }
        if (session !== query.from) {
          session = query.from;
          loading = true;
          error = '';
          void loadWikiTargets()
            .then(() => {
              loading = false;
              render();
            })
            .catch(() => {
              loading = false;
              error = '文章列表读取失败。按 Esc 关闭后重试。';
              render();
            });
        }
        if (previousText !== query.text) {
          selected = 0;
          previousText = query.text;
        }
        items =
          loading || error
            ? []
            : searchWikiTargets(currentWikiTargets(), query.text, editorWikiLocale());
        selected = Math.min(selected, Math.max(0, items.length - 1));
        menu.replaceChildren();
        const hint = doc.createElement('div');
        hint.textContent =
          error ||
          (loading
            ? '正在读取文章…'
            : items.length
              ? '↑ ↓ 选择 · Enter 插入 · Esc 关闭'
              : '没有匹配文章，可搜索标题或内容 ID');
        hint.style.cssText = 'padding:5px 8px;font-size:12px;opacity:.7;';
        menu.append(hint);
        items.forEach((target, index) => {
          const option = doc.createElement('button');
          option.type = 'button';
          option.role = 'option';
          option.id = `${id}-${index}`;
          option.tabIndex = -1;
          option.setAttribute('aria-selected', String(index === selected));
          option.style.cssText = `display:block;width:100%;padding:8px;text-align:left;border:0;border-radius:4px;color:inherit;cursor:pointer;background:${index === selected ? 'Highlight' : 'transparent'};${index === selected ? 'color:HighlightText;' : ''}`;
          const title = doc.createElement('div');
          title.textContent = target.title;
          const detail = doc.createElement('small');
          detail.textContent = `${target.locale.toUpperCase()} · ${target.id}${target.status === 'draft' ? ' · 草稿' : target.status === 'archived' ? ' · 已归档' : ''}`;
          option.append(title, detail);
          option.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            insert(view, target);
          });
          option.addEventListener('click', () => insert(view, target));
          menu.append(option);
        });
        if (!menu.isConnected) doc.body.append(menu);
        position();
        if (items.length) view.dom.setAttribute('aria-activedescendant', `${id}-${selected}`);
        menu.querySelector('[aria-selected=true]')?.scrollIntoView({ block: 'nearest' });
      };
      repaint = render;
      doc.addEventListener('scroll', position, true);
      win.addEventListener('resize', position);
      render();
      return {
        update: render,
        destroy() {
          destroyed = true;
          menu.remove();
          repaint = () => {};
          doc.removeEventListener('scroll', position, true);
          win.removeEventListener('resize', position);
        },
      };
    },
  });
}

export function withWikiLinks(field: MarkdocField): MarkdocField {
  const collaboration = field.collaboration;
  const attach = (state: EditorState) =>
    state.reconfigure({
      plugins: [wikiLinkPlugin(), ...state.plugins.filter((plugin) => plugin !== key.get(state))],
    });
  const normalize = (content: Uint8Array | undefined) =>
    content === undefined
      ? undefined
      : new TextEncoder().encode(normalizeWikiLinks(new TextDecoder().decode(content)));
  return {
    ...field,
    defaultValue: () => attach(field.defaultValue()),
    parse: (value, args) =>
      attach(field.parse(value, { ...args, content: normalize(args.content) })),
    serialize: (value, args) => {
      const serialized = field.serialize(preserveEditorWikiLinks(value), args);
      return {
        ...serialized,
        content: new TextEncoder().encode(
          escapeLiteralWikiLinks(new TextDecoder().decode(serialized.content)),
        ),
      };
    },
    reader: {
      ...field.reader,
      parse: (value, args) =>
        field.reader.parse(value, { ...args, content: normalize(args.content) }),
    },
    collaboration: collaboration
      ? {
          ...collaboration,
          fromYjs: (value, awareness) => attach(collaboration.fromYjs(value, awareness)),
        }
      : undefined,
  };
}
