import { attachConceptCards } from '../lib/concept-cards';

let stop: (() => void) | undefined;
let registered = false;
function highlightSource() {
  let hash: string;
  try {
    hash = decodeURIComponent(location.hash.slice(1));
  } catch {
    return;
  }
  if (!hash.startsWith('concept-')) return;
  const start = document.getElementById(hash);
  if (!start?.dataset.conceptStart) return;
  const end = [...document.querySelectorAll<HTMLElement>('[data-concept-end]')].find(
    (el) => el.dataset.conceptEnd === start.dataset.conceptStart,
  );
  if (!end || !(start.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
  const range = document.createRange();
  range.setStartAfter(start);
  range.setEndBefore(end);
  if (CSS.highlights && typeof Highlight !== 'undefined')
    CSS.highlights.set('concept-source', new Highlight(range));
  else start.parentElement?.classList.add('concept-source-highlight');
  start.scrollIntoView({ block: 'center' });
}
function setup() {
  stop?.();
  stop = attachConceptCards(
    document,
    (id) => {
      const el = [...document.querySelectorAll<HTMLAnchorElement>('[data-concept-link]')].find(
        (el) => el.dataset.conceptLink === id,
      );
      return el
        ? {
            id,
            name: el.dataset.conceptName ?? '',
            definition: el.dataset.conceptDefinition ?? '',
            href: el.href,
          }
        : undefined;
    },
    (c) => {
      if (c.href) location.assign(c.href);
    },
  );
  highlightSource();
}
export function initConceptReader() {
  if (registered) return;
  registered = true;
  setup();
  document.addEventListener('astro:page-load', setup);
  document.addEventListener('astro:before-swap', () => {
    stop?.();
    stop = undefined;
    CSS.highlights?.delete('concept-source');
  });
  window.addEventListener('hashchange', highlightSource);
}
