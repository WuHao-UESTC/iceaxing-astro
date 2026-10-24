import editorStyles from '../styles/keystatic-workspace-editor.css?inline';
import folderStyles from '../styles/keystatic-folder-form.css?inline';
import themeStyles from '../styles/keystatic-workspace-theme.css?inline';
import appearanceStyles from '../styles/keystatic-workspace-appearance.css?inline';
import refinementStyles from '../styles/keystatic-workspace-refinements.css?inline';
import { flushSync } from 'react-dom';
import { attachWorkspaceLayout } from './keystatic-workspace-layout';
import { decorateFolderForm } from './keystatic-folder-form';
import { decorateArticleForm } from './keystatic-article-form';
import { attachWorkspaceSections } from './keystatic-workspace-sections';
import { attachWorkspaceNames, type WorkspaceEditorLocation } from './keystatic-workspace-names';

const fieldHelp: Record<string, string> = {
  'URL slug': '页面 URL 中使用的路径片段；可修改，不改变稳定 ID 或内容关系。',
  标题: '当前语言版本在页面、列表与搜索中显示的标题。',
  中文标题: '中文展示名称，也是工作区文章组按拼音排序的依据。',
  'English title': '英文版本的展示名称。',
  'Deutscher Titel': '德文版本的展示名称。',
  中文简介: '中文页面或入口卡片中的简短介绍。',
  'English description': '英文页面或入口卡片中的简短介绍。',
  'Deutsche Beschreibung': '德文页面或入口卡片中的简短介绍。',
  摘要: '列表、卡片和搜索结果中的内容摘要。',
  状态: '控制内容的发布或归档状态；项目则表示其进行阶段。',
  发布时间: '内容首次公开的时间；定时发布时作为公开时间。',
  更新时间: '最近一次实质修改的时间。',
  创建时间: '分类、项目或合集的创建时间。',
  标签: '用于描述主题与检索的关键词，可添加多个。',
  作者: '内容署名。',
  排序: '控制网站展示顺序；工作区文章组统一按中文标题拼音排列，同组语言顺序为中文、英文、德文。',
  图标键: '用于入口展示的图标标识。',
  '进度（%）': '项目完成百分比，取值范围为 0–100。',
  进度: '拖动滑条填写项目完成百分比，取值范围为 0–100；也可以使用方向键微调。',
  所属分类: '项目归属的上级分类。',
  所属项目: '文章或合集归属的项目；合集必须选择上级项目。',
  'SEO 标题': '覆盖默认的搜索引擎标题；留空时使用内容标题。',
  'SEO 描述': '覆盖默认的搜索引擎描述；留空时使用摘要。',
  'SEO 覆盖（可选）': '可选的搜索引擎展示设置；无需覆盖时留空。',
  '翻译组 ID': '同一内容的中、英、德版本使用相同的翻译组 ID。',
  语言: '当前集合对应的语言；其他语言版本在对应集合中创建。',
  日志日期: '日志记录对应的日期。',
  日志分类: '日志的主题或类型。',
  页面类型: '决定页面使用关于、个人档案或自定义展示方式。',
  多语言文案: '分别填写中文、英文与德文的展示名称和介绍。',
};

function labelText(element: Element) {
  return (element.textContent ?? '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
}

/** Decorates the same-origin editor without replacing React fields or touching their values. */
export function enhanceWorkspaceEditor(
  document: Document,
  propertiesControls: HTMLElement,
  onNameChange?: (location: WorkspaceEditorLocation | null) => void,
) {
  const win = document.defaultView;
  if (!win) return () => {};
  const style = document.createElement('style');
  style.dataset.workspaceEditorStyle = 'true';
  style.textContent = `${themeStyles}\n${editorStyles}\n${folderStyles}\n${appearanceStyles}\n${refinementStyles}`;
  document.head.append(style);
  document.documentElement.dataset.workspaceEditor = 'true';
  const stopLayout = attachWorkspaceLayout(document, propertiesControls);
  const sections = attachWorkspaceSections(document);
  const names = attachWorkspaceNames(document, onNameChange);
  let queued = 0;
  let lastPath = '';
  let guide: HTMLDetailsElement | null = null;
  let signature = '';
  const explanations = new Map<string, string>();
  const resizeNotebook = (textarea: HTMLTextAreaElement) => {
    textarea.style.setProperty('height', '112px', 'important');
    const height = Math.max(112, Math.ceil(textarea.scrollHeight / 28) * 28);
    textarea.style.setProperty('height', `${height}px`, 'important');
  };
  let synchronizing = false;
  const onInput = (event: Event) => {
    const input = event.target;
    if (!(input instanceof win.HTMLInputElement || input instanceof win.HTMLTextAreaElement))
      return;
    if (input.matches('[data-ws-notebook]'))
      win.requestAnimationFrame(() => resizeNotebook(input as HTMLTextAreaElement));
    if (synchronizing || !input.matches('[data-ws-canonical-id]')) return;
    const root = input.closest('[data-ws-metadata]');
    if (!root) return;
    synchronizing = true;
    flushSync(() => {});
    const set = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')!.set!;
    for (const linked of root.querySelectorAll<HTMLInputElement>('[data-ws-linked-hidden] input')) {
      if (linked.value === input.value) continue;
      set.call(linked, input.value);
      flushSync(() => linked.dispatchEvent(new win.Event('input', { bubbles: true })));
    }
    synchronizing = false;
  };
  document.addEventListener('input', onInput);
  const onChange = () => {
    if (!queued) queued = win.requestAnimationFrame(update);
  };
  document.addEventListener('change', onChange);
  const resizeNotebooks = () =>
    document.querySelectorAll<HTMLTextAreaElement>('[data-ws-notebook]').forEach(resizeNotebook);
  win.addEventListener('resize', resizeNotebooks);

  function update() {
    queued = 0;
    const pathname = win!.location.pathname;
    if (pathname !== lastPath) {
      guide?.remove();
      guide = null;
      signature = '';
      lastPath = pathname;
      explanations.clear();
    }
    document.documentElement.dataset.workspaceLayout =
      /\/collection\/(categories|projects|series)\//.test(pathname) ? 'horizontal' : 'vertical';

    // Find the metadata grid from a labelled field, excluding body image controls and dialogs.
    const first = Array.from(
      document.querySelectorAll<HTMLElement>('input[aria-labelledby], textarea[aria-labelledby]'),
    ).find((node) => !node.closest('.ProseMirror, [role="dialog"], [aria-hidden="true"]'));
    if (!first) return;
    let root: HTMLElement | null = first.parentElement;
    while (
      root &&
      !(
        win!.getComputedStyle(root).display === 'grid' &&
        root.children.length >= 3 &&
        root.querySelectorAll('label[for]').length >= 3 &&
        (!root.querySelector('.ProseMirror') || root.hasAttribute('data-ws-compact-form'))
      )
    )
      root = root.parentElement;
    if (!root || root === document.body || root === document.documentElement) return;
    root.dataset.wsMetadata = 'true';
    for (const entry of root.children) {
      if (entry !== guide && entry instanceof win!.HTMLElement) entry.dataset.wsEntry = 'true';
    }
    const help = new Map<string, string>();
    const register = (label: HTMLElement, control: HTMLElement) => {
      const title = labelText(label);
      if (!title) return;
      let row = label.parentElement;
      while (row && row !== root && !row.contains(control)) row = row.parentElement;
      if (!row || row === root) return;
      row.dataset.wsField = 'true';
      label.dataset.wsLabel = 'true';
      if (title === 'SEO 描述' && control instanceof win!.HTMLTextAreaElement) {
        control.dataset.wsNotebook = 'true';
        row.dataset.wsSeoDescription = 'true';
      }
      if (control.getAttribute('aria-invalid') === 'true') {
        for (const id of (control.getAttribute('aria-describedby') ?? '').split(/\s+/)) {
          let error = document.getElementById(id);
          if (!error || error.hasAttribute('data-ws-description') || !row.contains(error)) continue;
          while (error.parentElement && error.parentElement !== row) error = error.parentElement;
          if (error.parentElement === row) error.dataset.wsFieldError = 'true';
        }
      }
      const descriptions: string[] = [];
      for (const id of (
        control.getAttribute('aria-describedby') ??
        row.getAttribute('aria-describedby') ??
        ''
      ).split(/\s+/)) {
        const description = document.getElementById(id);
        // Errors remain inline, including errors rendered after pressing Save.
        if (
          !description ||
          !row.contains(description) ||
          control.getAttribute('aria-invalid') === 'true' ||
          description.matches('[role="alert"], [aria-live]') ||
          description.closest('[role="alert"]')
        )
          continue;
        if (description === label || description.querySelector('input, button, textarea')) continue;
        const text = labelText(description);
        if (!text) continue;
        description.dataset.wsDescription = 'true';
        descriptions.push(text);
      }
      const explanation =
        descriptions.join(' ') ||
        explanations.get(title) ||
        fieldHelp[title] ||
        `填写“${title}”的属性值；必填项以 * 标记。`;
      explanations.set(title, explanation);
      help.set(title, explanation);
    };
    for (const label of root.querySelectorAll<HTMLLabelElement>('label[for]')) {
      if (label.closest('.ProseMirror')) continue;
      const control = document.getElementById(label.htmlFor);
      if (control && !control.closest('[aria-hidden="true"]')) register(label, control);
    }
    for (const control of root.querySelectorAll<HTMLElement>('[aria-labelledby]')) {
      if (
        control.closest('[aria-hidden="true"], .ProseMirror') ||
        control === guide ||
        control.closest('[data-ws-guide]')
      )
        continue;
      const labels = (control.getAttribute('aria-labelledby') ?? '')
        .split(/\s+/)
        .map((id) => document.getElementById(id));
      const label = labels.find((node) => node && !control.contains(node));
      if (label) register(label, control);
      else if (control.getAttribute('role') === 'group' && labels[0]) register(labels[0], control);
    }
    for (const checkbox of root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
      const label = checkbox.closest('label');
      if (!label) continue;
      const texts = label.querySelectorAll<HTMLElement>('[class~="kui:Text"]');
      const title = texts[0] && labelText(texts[0]);
      if (!title) continue;
      label.dataset.wsCheckbox = 'true';
      if (texts[1]) texts[1].dataset.wsDescription = 'true';
      const explanation =
        (texts[1] && labelText(texts[1])) || fieldHelp[title] || `启用或关闭“${title}”。`;
      explanations.set(title, explanation);
      help.set(title, explanation);
    }
    // The input's decorative frame is a separate React Aria presentation element.
    for (const input of document.querySelectorAll<HTMLElement>(
      'input[data-adornment], textarea[data-adornment]',
    )) {
      input.parentElement?.setAttribute('data-ws-input', 'true');
    }
    const isArticle = /\/collection\/articles(?:Zh|En|De)\//.test(pathname);
    if (document.documentElement.dataset.workspaceLayout === 'horizontal' || isArticle) {
      const fields = Array.from(root.querySelectorAll<HTMLLabelElement>('label[for]'));
      const stable = fields.find((label) =>
        /^稳定(分类|项目|合集|内容)\s*ID/.test(labelText(label)),
      );
      if (stable) {
        document.getElementById(stable.htmlFor)?.setAttribute('data-ws-canonical-id', 'true');
        stable.dataset.wsUnifiedLabel = 'true';
        stable.title = isArticle
          ? '同时作为稳定内容 ID、文件键、翻译组 ID 与 URL slug；修改后同步四项。'
          : '同时作为稳定 ID、文件键与 URL slug；修改后同步三项。';
        for (const label of fields.filter((label) =>
          ['文件键', 'URL slug', ...(isArticle ? ['翻译组 ID'] : [])].includes(labelText(label)),
        )) {
          label.closest('[data-ws-field]')?.setAttribute('data-ws-linked-hidden', 'true');
        }
        for (const button of root.querySelectorAll('button[aria-label="regenerate"]'))
          button.setAttribute('data-ws-linked-hidden', 'true');
      }
    }
    for (const entry of Array.from(root.children)) {
      if (entry === guide) continue;
      const labels = Array.from(entry.querySelectorAll('label')).map(labelText);
      if (
        !labels.includes('English title') ||
        !labels.includes('Deutscher Titel') ||
        !labels.includes('中文标题')
      )
        continue;
      entry.setAttribute('data-ws-localized', 'true');
      // The unlabelled Keystatic object renders one 12-column grid with three child objects.
      const grid = entry.firstElementChild;
      grid?.setAttribute('data-ws-language-grid', 'true');
      for (const child of Array.from(grid?.children ?? []))
        child.setAttribute('data-ws-language-column', 'true');
      for (const textarea of entry.querySelectorAll<HTMLTextAreaElement>('textarea')) {
        if (!textarea.hasAttribute('data-ws-notebook')) {
          textarea.dataset.wsNotebook = 'true';
          resizeNotebook(textarea);
        }
      }
    }
    decorateFolderForm(root, pathname);
    decorateArticleForm(root, pathname);
    sections.decorate(root);
    names.update();
    resizeNotebooks();
    if (!guide?.isConnected) {
      guide = document.createElement('details');
      guide.dataset.wsGuide = 'true';
      const summary = document.createElement('summary');
      summary.textContent = '属性填写说明';
      guide.append(summary, document.createElement('dl'));
      root.append(guide);
      if (isArticle) guide.style.order = '80';
      signature = '';
    }
    if (root.lastElementChild !== guide) root.append(guide);
    const next = JSON.stringify([...help]);
    if (next !== signature) {
      const list = guide.querySelector('dl')!;
      list.replaceChildren(
        ...[...help].map(([title, explanation]) => {
          const entry = document.createElement('div');
          const term = document.createElement('dt');
          term.textContent = title;
          const detail = document.createElement('dd');
          detail.textContent = explanation;
          entry.append(term, detail);
          return entry;
        }),
      );
      signature = next;
    }
  }
  const observer = new MutationObserver((records) => {
    if (
      records.every((record) =>
        (record.target as Element).closest?.('.ProseMirror, [data-ws-guide]'),
      )
    )
      return;
    if (!queued) queued = win.requestAnimationFrame(update);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-invalid', 'aria-describedby', 'aria-labelledby'],
  });
  update();
  return () => {
    observer.disconnect();
    stopLayout();
    sections.cleanup();
    names.cleanup();
    document.removeEventListener('input', onInput);
    document.removeEventListener('change', onChange);
    win.removeEventListener('resize', resizeNotebooks);
    if (queued) win.cancelAnimationFrame(queued);
    guide?.remove();
    style.remove();
    delete document.documentElement.dataset.workspaceEditor;
    delete document.documentElement.dataset.workspaceLayout;
  };
}
