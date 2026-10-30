import type { fields } from '@keystatic/core';
import { Plugin, PluginKey, TextSelection, type EditorState } from 'prosemirror-state';
import type { Node as PMNode } from 'prosemirror-model';
import type { EditorView } from 'prosemirror-view';
import { editorWikiLocale } from './wikilink-catalog';
import { mergeConcepts, normalizeConceptName, searchConcepts, type Concept } from './concepts';
import { attachConceptCards } from './concept-cards';
import { conceptWorkspaceHref } from './concept-location';
import panelCss from '../styles/concepts-editor.css?inline';
import cardCss from '../styles/concepts.css?inline';

type Field = ReturnType<typeof fields.markdoc>;
interface Draft {
  from: number;
  to: number;
  text: string;
}
const key = new PluginKey<{ draft?: Draft }>('iceaxing-concepts');
const leafText = (node: PMNode) => {
  const value = node.attrs.props?.value;
  return ['inlineMath', 'math'].includes(node.type.name)
    ? `$${value?.expression ?? ''}$`
    : node.type.name === 'conceptLink'
      ? (value?.name ?? '')
      : '';
};
const textBetween = (state: EditorState, from: number, to: number) =>
  state.doc.textBetween(from, to, '\n', leafText).trim();
export function editorConcepts(state: EditorState): Concept[] {
  const starts = new Map<string, { name: string; from: number }>();
  const result: Concept[] = [];
  state.doc.descendants((node, position) => {
    const v = node.attrs.props?.value;
    if (node.type.name === 'conceptStart')
      starts.set(v.id, { name: v.name, from: position + node.nodeSize });
    if (node.type.name === 'conceptEnd') {
      const start = starts.get(v.id);
      if (start) {
        result.push({
          id: v.id,
          name: start.name,
          definition: textBetween(state, start.from, position),
          from: start.from,
          to: position,
        });
        starts.delete(v.id);
      }
    }
  });
  return result.filter((c) => c.definition && result.filter((x) => x.id === c.id).length === 1);
}
function component(state: EditorState, name: string, value: Record<string, string>) {
  const type = state.schema.nodes[name];
  const props = type?.createAndFill()?.attrs.props;
  return type && props
    ? type.create({ props: { ...props, value: { ...props.value, ...value } } })
    : undefined;
}
export function defineEditorConcept(state: EditorState, draft: Draft, name: string, id: string) {
  if (
    !name.trim() ||
    draft.from >= draft.to ||
    draft.to > state.doc.content.size ||
    textBetween(state, draft.from, draft.to) !== draft.text
  )
    throw new Error('所选文字已变化，请重新选择。');
  if (editorConcepts(state).some((c) => draft.from <= c.to! && draft.to >= c.from!))
    throw new Error('所选文字已有概念，请选择其他文字。');
  let protectedNode = false;
  state.doc.nodesBetween(draft.from, draft.to, (node) => {
    if (node.type.spec.code) protectedNode = true;
  });
  if (protectedNode) throw new Error('请在正文中选择概念文字。');
  const start = component(state, 'conceptStart', { id, name: name.trim() }),
    end = component(state, 'conceptEnd', { id });
  if (!start || !end) throw new Error('当前正文不支持概念标记。');
  const tr = state.tr.insert(draft.to, end).insert(draft.from, start);
  tr.setSelection(TextSelection.near(tr.doc.resolve(tr.mapping.map(draft.to, 1))));
  return tr.setMeta(key, { clear: true }).scrollIntoView();
}
export function insertEditorConcept(state: EditorState, concept: Concept) {
  const node = component(state, 'conceptLink', { target: concept.id, name: concept.name });
  if (!node) throw new Error('当前正文不支持概念链接。');
  return state.tr.replaceSelectionWith(node).scrollIntoView();
}

async function loadCatalog(win: Window) {
  const branch = win.location.pathname.match(/\/branch\/([^/]+)/)?.[1] ?? '';
  const url = new URL('/api/keystatic-concepts', win.location.origin);
  if (branch) url.searchParams.set('branch', decodeURIComponent(branch));
  const response = await win.fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || '概念读取失败');
  return data.concepts as Concept[];
}

function conceptPlugin() {
  return new Plugin<{ draft?: Draft }>({
    key,
    state: {
      init: () => ({}),
      apply(tr, previous) {
        const meta = tr.getMeta(key);
        if (meta?.clear) return {};
        if (meta?.draft) return { draft: meta.draft };
        return previous.draft
          ? {
              draft: {
                ...previous.draft,
                from: tr.mapping.map(previous.draft.from, 1),
                to: tr.mapping.map(previous.draft.to, -1),
              },
            }
          : previous;
      },
    },
    view(view) {
      return mountConceptPanel(view);
    },
  });
}

function mountConceptPanel(view: EditorView) {
  const doc = view.dom.ownerDocument,
    win = doc.defaultView!;
  const style = doc.createElement('style');
  style.textContent = `${panelCss}\n${cardCss}`;
  doc.head.append(style);
  view.dom.dataset.conceptEditor = 'true';
  const panel = doc.createElement('aside');
  panel.className = 'concept-float';
  panel.setAttribute('aria-label', '概念查找');
  const button = (text: string, label?: string) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = text;
    if (label) b.setAttribute('aria-label', label);
    return b;
  };
  const header = doc.createElement('header'),
    toggle = button('概念 −', '展开或收起概念'),
    actions = doc.createElement('div');
  actions.className = 'concept-float-actions';
  const add = button('新建'),
    insert = button('插入链接 ↗');
  actions.append(add, insert);
  header.append(toggle, actions);
  const picker = doc.createElement('div'),
    search = doc.createElement('input'),
    results = doc.createElement('div');
  search.type = 'search';
  search.placeholder = '查找概念…';
  search.setAttribute('aria-label', '查找概念');
  results.className = 'concept-results';
  picker.append(search, results);
  const form = doc.createElement('form'),
    label = doc.createElement('label'),
    name = doc.createElement('input'),
    excerpt = doc.createElement('p'),
    formActions = doc.createElement('div');
  const uid = `concept-name-${win.crypto.randomUUID()}`;
  label.htmlFor = uid;
  label.textContent = '概念名称';
  name.id = uid;
  name.placeholder = '为所选文字命名…';
  name.maxLength = 80;
  excerpt.className = 'concept-excerpt';
  formActions.className = 'concept-create-actions';
  const save = button('保存'),
    cancel = button('取消');
  save.type = 'submit';
  formActions.append(save, cancel);
  form.append(label, name, excerpt, formActions);
  form.hidden = true;
  const status = doc.createElement('p');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  panel.append(header, picker, form, status);
  doc.body.append(panel);
  let saved: Concept[] = [],
    selected = '',
    expanded = win.innerWidth >= 900,
    disposed = false,
    loading = true,
    error = '',
    signature = '',
    articleId = '';
  let matches: Concept[] = [];
  const locationId = () => {
    const input = doc.querySelector<HTMLInputElement>(
      '[data-ws-canonical-id] input, input[data-ws-canonical-id]',
    );
    return input?.value || win.location.pathname.match(/\/item\/([^/]+)/)?.[1] || '';
  };
  const all = () => {
    articleId = locationId();
    return mergeConcepts(
      saved,
      editorConcepts(view.state).map((c) => ({ ...c, articleId })),
      articleId,
    );
  };
  const render = () => {
    matches = searchConcepts(all(), search.value, editorWikiLocale());
    if (!matches.some((c) => c.id === selected)) selected = matches[0]?.id ?? '';
    const next = JSON.stringify([matches.map((c) => [c.id, c.name]), selected]);
    if (next !== signature) {
      signature = next;
      results.replaceChildren(
        ...matches.map((c) => {
          const b = button(c.name);
          b.setAttribute('aria-label', c.name);
          b.setAttribute('aria-pressed', String(c.id === selected));
          b.addEventListener('click', () => {
            selected = c.id;
            render();
          });
          return b;
        }),
      );
    }
    insert.disabled = !selected || !form.hidden;
    save.disabled = loading;
    if (form.hidden)
      status.textContent =
        error || (loading ? '正在读取概念…' : matches.length ? '' : '没有匹配的概念');
    position();
  };
  function position() {
    const rect = view.dom.getBoundingClientRect(),
      wide = rect.width >= 600;
    panel.hidden = rect.bottom < 80 || rect.top >= win.innerHeight;
    panel.style.left = `${Math.max(8, rect.left + 12)}px`;
    panel.style.top = `${Math.max(76, rect.top + 8)}px`;
    picker.hidden = !expanded || !form.hidden;
    actions.hidden = !expanded;
    toggle.textContent = expanded ? '概念 −' : '概念 ＋';
    toggle.setAttribute('aria-expanded', String(expanded));
    view.dom.style.setProperty('--concept-gutter', wide && expanded ? '202px' : '0px');
    view.dom.style.setProperty(
      '--concept-top',
      wide ? '38px' : `${expanded ? panel.offsetHeight + 26 : 44}px`,
    );
  }
  const refresh = () => {
    loading = true;
    error = '';
    render();
    void loadCatalog(win)
      .then((c) => {
        if (!disposed) {
          saved = c;
          loading = false;
          render();
        }
      })
      .catch((e) => {
        if (!disposed) {
          loading = false;
          error = `${e.message}，重新聚焦查找框可重试。`;
          render();
        }
      });
  };
  const stopCards = attachConceptCards(
    doc,
    (id) => all().find((c) => c.id === id),
    (c) => {
      if (c.from !== undefined && c.to !== undefined) {
        view.dispatch(
          view.state.tr
            .setSelection(TextSelection.create(view.state.doc, c.from, c.to))
            .scrollIntoView(),
        );
        view.focus();
      } else if (c.editorHref) {
        const href = conceptWorkspaceHref(c.editorHref);
        if (href) win.open(href, '_blank', 'noopener');
      }
    },
  );
  toggle.addEventListener('click', () => {
    expanded = !expanded;
    if (!expanded) {
      form.hidden = true;
      insert.hidden = false;
      add.hidden = false;
      view.dispatch(view.state.tr.setMeta(key, { clear: true }));
    }
    render();
  });
  add.addEventListener('click', () => {
    const { from, to, empty } = view.state.selection;
    const text = textBetween(view.state, from, to);
    if (empty || !text) {
      status.textContent = '先选中正文中的文字，再点击新建。';
      return;
    }
    view.dispatch(view.state.tr.setMeta(key, { draft: { from, to, text } }));
    form.hidden = false;
    picker.hidden = true;
    insert.hidden = true;
    add.hidden = true;
    name.value = '';
    excerpt.textContent = text;
    status.textContent = '';
    position();
    name.focus();
  });
  const cancelForm = () => {
    form.hidden = true;
    insert.hidden = false;
    add.hidden = false;
    view.dispatch(view.state.tr.setMeta(key, { clear: true }));
    render();
  };
  cancel.addEventListener('click', cancelForm);
  name.addEventListener('input', () => {
    status.textContent = '';
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (loading) return;
    const draft = key.getState(view.state)?.draft;
    if (!name.value.trim()) {
      status.textContent = '请填写概念名称。';
      return;
    }
    if (error) {
      status.textContent = error;
      return;
    }
    if (all().some((c) => normalizeConceptName(c.name) === normalizeConceptName(name.value))) {
      status.textContent = '此概念名称已存在。';
      return;
    }
    try {
      if (!draft) throw new Error('请重新选择正文文字。');
      const id = `c-${win.crypto.randomUUID()}`;
      view.dispatch(defineEditorConcept(view.state, draft, name.value, id));
      selected = id;
      search.value = '';
      cancelForm();
      status.textContent = '已新建概念，保存笔记后可在其他笔记中引用。';
      view.focus();
    } catch (e) {
      status.textContent = e instanceof Error ? e.message : '新建失败';
    }
  });
  const doInsert = () => {
    const c = all().find((c) => c.id === selected);
    if (c) {
      view.dispatch(insertEditorConcept(view.state, c));
      view.focus();
    }
  };
  insert.addEventListener('click', doInsert);
  search.addEventListener('input', render);
  search.addEventListener('focus', refresh);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      doInsert();
    } else if (['ArrowUp', 'ArrowDown'].includes(event.key) && matches.length) {
      event.preventDefault();
      const at = matches.findIndex((c) => c.id === selected);
      selected =
        matches[(at + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length]!.id;
      render();
    }
  });
  form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelForm();
    }
  });
  const observer = new win.ResizeObserver(position);
  observer.observe(view.dom);
  observer.observe(panel);
  doc.addEventListener('scroll', position, true);
  win.addEventListener('resize', position);
  refresh();
  let located = false;
  const locateSource = () => {
    if (disposed || located || !win.location.hash.startsWith('#concept-')) return;
    const c = editorConcepts(view.state).find((c) => `#concept-${c.id}` === win.location.hash);
    if (!c) return;
    located = true;
    view.dispatch(
      view.state.tr
        .setSelection(TextSelection.create(view.state.doc, c.from!, c.to!))
        .scrollIntoView(),
    );
    view.focus();
  };
  win.requestAnimationFrame(locateSource);
  const onHashChange = () => {
    located = false;
    locateSource();
  };
  win.addEventListener('hashchange', onHashChange);
  return {
    update() {
      render();
      if (!located && win.location.hash.startsWith('#concept-')) {
        win.requestAnimationFrame(locateSource);
      }
    },
    destroy() {
      disposed = true;
      stopCards();
      observer.disconnect();
      panel.remove();
      style.remove();
      delete view.dom.dataset.conceptEditor;
      view.dom.style.removeProperty('--concept-gutter');
      view.dom.style.removeProperty('--concept-top');
      doc.removeEventListener('scroll', position, true);
      win.removeEventListener('resize', position);
      win.removeEventListener('hashchange', onHashChange);
    },
  };
}

export function withConcepts(field: Field): Field {
  const attach = (state: EditorState) =>
    state.reconfigure({
      plugins: [conceptPlugin(), ...state.plugins.filter((p) => p !== key.get(state))],
    });
  return {
    ...field,
    defaultValue: () => attach(field.defaultValue()),
    parse: (value, args) => attach(field.parse(value, args)),
    collaboration: field.collaboration
      ? {
          ...field.collaboration,
          fromYjs: (value, awareness) => attach(field.collaboration!.fromYjs(value, awareness)),
        }
      : undefined,
  };
}
