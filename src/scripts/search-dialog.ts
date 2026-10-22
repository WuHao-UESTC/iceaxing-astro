import { isLocale } from '../i18n/config';
import { searchCopy, searchCountLabel } from '../lib/search-copy';
import { safeSearchUrl, searchPageSize, searchTypes, type SearchItem } from '../lib/search';

interface PagefindResultData {
  url: string;
  meta: { title?: string; type?: string; category?: string };
  excerpt: string;
}
interface PagefindHandle {
  data(): Promise<PagefindResultData>;
}
interface PagefindModule {
  init(): Promise<void>;
  search(
    query: string | null,
    options: { filters: Record<string, string> },
  ): Promise<{ results: PagefindHandle[] }>;
}

export function initSearchDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-search-dialog]');
  if (!dialog || dialog.dataset.initialized) return;
  dialog.dataset.initialized = 'true';
  const locale = isLocale(dialog.dataset.locale) ? dialog.dataset.locale : 'zh';
  const copy = searchCopy[locale];
  const form = dialog.querySelector<HTMLFormElement>('[data-search-form]')!;
  const input = form.querySelector<HTMLInputElement>('[name="query"]')!;
  const type = form.querySelector<HTMLSelectElement>('[name="type"]')!;
  const category = form.querySelector<HTMLSelectElement>('[name="category"]')!;
  const status = dialog.querySelector<HTMLElement>('[data-search-status]')!;
  const results = dialog.querySelector<HTMLOListElement>('[data-search-results]')!;
  const clear = dialog.querySelector<HTMLButtonElement>('[data-search-clear]')!;
  const reset = dialog.querySelector<HTMLButtonElement>('[data-search-reset]')!;
  const more = dialog.querySelector<HTMLButtonElement>('[data-search-more]')!;
  const retry = dialog.querySelector<HTMLButtonElement>('[data-search-retry]')!;
  let enginePromise: Promise<PagefindModule> | undefined;
  let sequence = 0,
    debounce = 0,
    page = 1,
    total = 0,
    hasMore = false;
  let handles: PagefindHandle[] | undefined;
  let controller: AbortController | undefined;
  let opener: HTMLElement | null = null;

  function loadPagefind() {
    if (!enginePromise) {
      const path = '/pagefind/pagefind.js';
      enginePromise = import(/* @vite-ignore */ path)
        .then(async (module: PagefindModule) => {
          await module.init();
          return module;
        })
        .catch((error) => {
          enginePromise = undefined;
          throw error;
        });
    }
    return enginePromise;
  }

  function appendExcerpt(target: HTMLElement, item: SearchItem) {
    if (item.html) {
      // The index may contain markup. Only text and <mark> are ever inserted.
      const parsed = new DOMParser().parseFromString(item.excerpt, 'text/html');
      const append = (node: Node, parent: Node) => {
        if (node.nodeType === Node.TEXT_NODE)
          parent.appendChild(document.createTextNode(node.textContent ?? ''));
        else if (node instanceof Element && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
          const next = node.tagName === 'MARK' ? document.createElement('mark') : parent;
          if (next !== parent) parent.appendChild(next);
          node.childNodes.forEach((child) => append(child, next));
        }
      };
      parsed.body.childNodes.forEach((node) => append(node, target));
    } else {
      const terms =
        input.value
          .match(/"[^"]+"|\S+/g)
          ?.map((term) => term.replace(/^"|"$/g, '').replace(/^#/, ''))
          .filter(Boolean) ?? [];
      const pattern = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      if (!pattern) {
        target.textContent = item.excerpt;
        return;
      }
      const expression = new RegExp(pattern, 'giu');
      let last = 0;
      for (const match of item.excerpt.matchAll(expression)) {
        target.append(document.createTextNode(item.excerpt.slice(last, match.index)));
        const mark = document.createElement('mark');
        mark.textContent = match[0];
        target.append(mark);
        last = match.index + match[0].length;
      }
      target.append(document.createTextNode(item.excerpt.slice(last)));
    }
  }

  function render(items: SearchItem[]) {
    for (const item of items) {
      const url = safeSearchUrl(item.url, location.origin);
      if (!url) continue;
      const li = document.createElement('li'),
        link = document.createElement('a');
      const title = document.createElement('strong'),
        excerpt = document.createElement('p');
      link.href = url;
      appendExcerpt(title, { ...item, excerpt: item.title || url, html: false });
      const meta = document.createElement('small');
      const label = searchTypes.find((value) => value === item.type);
      const categoryLabel = [...category.options].find(
        (option) => option.value && option.value === item.category,
      )?.text;
      meta.textContent = [label ? copy[label] : '', categoryLabel].filter(Boolean).join(' / ');
      if (meta.textContent) link.append(meta);
      appendExcerpt(excerpt, item);
      link.append(title, excerpt);
      li.append(link);
      results.append(li);
    }
  }

  function busy(value: boolean) {
    results.setAttribute('aria-busy', String(value));
    more.disabled = value;
    more.textContent = value ? copy.loading : copy.more;
  }

  async function runSearch(append = false) {
    window.clearTimeout(debounce);
    controller?.abort();
    const requestController = new AbortController();
    controller = requestController;
    const signal = requestController.signal,
      current = ++sequence;
    const query = input.value.trim();
    const selectedType = type.value,
      selectedCategory = category.value;
    clear.hidden = !input.value;
    reset.hidden = !query && !type.value && !category.value;
    retry.hidden = true;
    if (!append) {
      results.replaceChildren();
      handles = undefined;
      page = 1;
      more.hidden = true;
    }
    if (!query && !type.value && !category.value) {
      status.textContent = copy.hint;
      busy(false);
      return;
    }
    busy(true);
    status.textContent = copy.loading;
    let nextHandles = handles;
    try {
      let items: SearchItem[];
      let nextTotal: number, nextHasMore: boolean;
      const nextPage = append ? page + 1 : 1;
      if (!append && dialog!.dataset.searchMode === 'pagefind') {
        try {
          let timer = 0;
          const timeout = new Promise<never>(
            (_, reject) =>
              (timer = window.setTimeout(() => reject(new Error('Search index timeout')), 6000)),
          );
          const data = await Promise.race([
            (async () => {
              const engine = await loadPagefind();
              const filters: Record<string, string> = { locale };
              if (selectedType) filters.type = selectedType;
              if (selectedCategory) filters.category = selectedCategory;
              return engine.search(query || null, { filters });
            })(),
            timeout,
          ]).finally(() => window.clearTimeout(timer));
          if (current !== sequence) return;
          nextHandles = data.results;
        } catch {
          if (current !== sequence) return;
          dialog!.dataset.searchMode = 'fallback';
        }
      }
      if (nextHandles) {
        const data = await Promise.all(
          nextHandles
            .slice((nextPage - 1) * searchPageSize, nextPage * searchPageSize)
            .map((handle) => handle.data()),
        );
        items = data.map((item) => ({
          url: item.url,
          title: item.meta.title ?? item.url,
          excerpt: item.excerpt,
          type: item.meta.type,
          category: item.meta.category,
          html: true,
        }));
        nextTotal = nextHandles.length;
        nextHasMore = nextPage * searchPageSize < nextTotal;
      } else {
        const params = new URLSearchParams({
          q: query,
          locale,
          type: selectedType,
          category: selectedCategory,
          page: String(nextPage),
        });
        const timer = window.setTimeout(
          () => requestController.abort(new DOMException('Search timeout', 'TimeoutError')),
          10000,
        );
        const data = await (async () => {
          const response = await fetch(`/api/search?${params}`, { signal });
          if (!response.ok) throw new Error('Search request failed');
          return response.json() as Promise<{
            items: SearchItem[];
            total: number;
            hasMore: boolean;
          }>;
        })().finally(() => window.clearTimeout(timer));
        items = data.items;
        nextTotal = data.total;
        nextHasMore = data.hasMore;
      }
      if (current !== sequence || signal.aborted) return;
      handles = nextHandles;
      total = nextTotal;
      hasMore = nextHasMore;
      render(items);
      page = nextPage;
      status.textContent = total
        ? searchCountLabel(locale, results.children.length, total)
        : copy.empty;
      more.hidden = !hasMore;
    } catch {
      if (current !== sequence || (signal.aborted && signal.reason?.name !== 'TimeoutError'))
        return;
      if (nextHandles) {
        dialog!.dataset.searchMode = 'fallback';
        void runSearch();
        return;
      }
      status.textContent = copy.failed;
      retry.hidden = false;
    } finally {
      if (current === sequence) busy(false);
    }
  }

  function queueSearch() {
    ++sequence;
    controller?.abort();
    window.clearTimeout(debounce);
    clear.hidden = !input.value;
    reset.hidden = !input.value && !type.value && !category.value;
    results.replaceChildren();
    more.hidden = true;
    retry.hidden = true;
    status.textContent = copy.loading;
    debounce = window.setTimeout(() => void runSearch(), 180);
  }
  function open() {
    if (dialog!.open) {
      input.focus();
      return;
    }
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!opener || opener === document.body)
      opener = document.querySelector<HTMLElement>('[data-search-open]');
    document.querySelectorAll<HTMLDetailsElement>('[data-header-details]').forEach((item) => {
      item.open = false;
    });
    dialog!.showModal();
    document.documentElement.classList.add('search-is-open');
    input.focus();
    if (input.value.trim() || type.value || category.value) void runSearch();
  }
  document
    .querySelectorAll<HTMLElement>('[data-search-open]')
    .forEach((button) => button.addEventListener('click', open));
  function finishClosing() {
    if (dialog!.open || !document.documentElement.classList.contains('search-is-open')) return;
    document.documentElement.classList.remove('search-is-open');
    ++sequence;
    controller?.abort();
    window.clearTimeout(debounce);
    busy(false);
    opener?.focus({ preventScroll: true });
    if (status.textContent === copy.loading) status.textContent = copy.hint;
  }
  function close() {
    dialog!.close();
    finishClosing();
  }
  dialog.querySelector('[data-search-close]')?.addEventListener('click', close);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      close();
  });
  dialog.addEventListener('close', finishClosing);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void runSearch();
  });
  input.addEventListener('input', (event) => {
    if (!(event as InputEvent).isComposing) queueSearch();
  });
  input.addEventListener('compositionstart', () => {
    ++sequence;
    controller?.abort();
    window.clearTimeout(debounce);
  });
  input.addEventListener('compositionend', queueSearch);
  [type, category].forEach((select) => select.addEventListener('change', () => void runSearch()));
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    void runSearch();
  });
  reset.addEventListener('click', () => {
    form.reset();
    input.focus();
    void runSearch();
  });
  more.addEventListener('click', () => void runSearch(true));
  retry.addEventListener('click', () => void runSearch());
  dialog.addEventListener('keydown', (event) => {
    if ((event.key !== 'ArrowDown' && event.key !== 'ArrowUp') || event.isComposing) return;
    const links = [...results.querySelectorAll<HTMLAnchorElement>('a')];
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (document.activeElement !== input && index === -1) return;
    const next = event.key === 'ArrowDown' ? Math.min(index + 1, links.length - 1) : index - 1;
    if (!links.length) return;
    event.preventDefault();
    (next < 0 ? input : links[next])?.focus();
  });
  document.addEventListener('keydown', (event) => {
    const editable =
      event.target instanceof Element &&
      (event.target.closest('input, textarea, select') ||
        (event.target instanceof HTMLElement && event.target.isContentEditable));
    if (event.isComposing || event.repeat || event.altKey) return;
    if (
      ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') ||
      (event.key === '/' && !editable && !event.ctrlKey && !event.metaKey)
    ) {
      event.preventDefault();
      open();
    }
  });
}
