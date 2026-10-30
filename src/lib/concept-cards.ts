import type { Concept } from './concepts';

/** Shared pointer, keyboard and touch preview; no HTML from content is injected. */
export function attachConceptCards(
  document: Document,
  resolve: (id: string) => Concept | undefined,
  open: (concept: Concept) => void,
) {
  const win = document.defaultView!;
  const card = document.createElement('div');
  card.className = 'concept-hover-card';
  card.hidden = true;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', '概念说明');
  const title = document.createElement('strong');
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', '关闭概念说明');
  const text = document.createElement('p');
  const source = document.createElement('button');
  source.type = 'button';
  source.textContent = '查看原文 ↗';
  card.append(title, close, text, source);
  document.body.append(card);
  let anchor: HTMLElement | null = null;
  let current: Concept | undefined;
  let timer = 0;
  let dismissed = false;
  const clear = () => win.clearTimeout(timer);
  const hide = () => {
    clear();
    card.hidden = true;
    anchor = null;
    current = undefined;
    dismissed = true;
  };
  const position = () => {
    if (!anchor || card.hidden) return;
    const rect = anchor.getBoundingClientRect();
    card.style.width = `${Math.min(320, win.innerWidth - 24)}px`;
    card.style.left = `${Math.max(12, Math.min(rect.left, win.innerWidth - card.offsetWidth - 12))}px`;
    card.style.top = `${Math.max(8, rect.bottom + 8 + card.offsetHeight < win.innerHeight ? rect.bottom + 8 : rect.top - card.offsetHeight - 8)}px`;
  };
  const show = (element: HTMLElement) => {
    clear();
    current = resolve(element.dataset.conceptLink ?? '');
    if (!current) return;
    anchor = element;
    title.textContent = current.name;
    text.textContent = current.definition;
    source.hidden = !(current.href || current.editorHref || current.from !== undefined);
    card.hidden = false;
    position();
  };
  const leave = () => {
    clear();
    timer = win.setTimeout(() => {
      if (!card.contains(document.activeElement) && document.activeElement !== anchor) hide();
    }, 180);
  };
  const target = (event: Event) =>
    event.target instanceof win.Element
      ? event.target.closest<HTMLElement>('[data-concept-link]')
      : null;
  const over = (event: Event) => {
    const el = target(event);
    if (el && !dismissed) show(el);
  };
  const move = (event: Event) => {
    if (dismissed) {
      dismissed = false;
      const el = target(event);
      if (el) show(el);
    }
  };
  const out = (event: PointerEvent) => {
    if (
      target(event) &&
      !(event.relatedTarget instanceof win.Node && card.contains(event.relatedTarget))
    )
      leave();
  };
  const focus = (event: FocusEvent) => {
    const el = target(event);
    if (el) show(el);
  };
  const click = (event: MouseEvent) => {
    const el = target(event);
    if (el && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      show(el);
    } else if (!card.contains(event.target as Node)) hide();
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !card.hidden) {
      event.preventDefault();
      hide();
    } else if ((event.key === 'Enter' || event.key === ' ') && target(event)) {
      event.preventDefault();
      show(target(event)!);
    }
  };
  const blur = (event: FocusEvent) => {
    if (!card.contains(event.relatedTarget as Node | null)) leave();
  };
  document.addEventListener('pointerover', over);
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerout', out);
  document.addEventListener('focusin', focus);
  document.addEventListener('focusout', blur);
  document.addEventListener('click', click);
  document.addEventListener('keydown', key);
  document.addEventListener('scroll', position, true);
  win.addEventListener('resize', position);
  card.addEventListener('pointerenter', clear);
  card.addEventListener('pointerleave', leave);
  close.addEventListener('click', hide);
  source.addEventListener('click', () => {
    const c = current;
    hide();
    if (c) open(c);
  });
  return () => {
    hide();
    card.remove();
    document.removeEventListener('pointerover', over);
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerout', out);
    document.removeEventListener('focusin', focus);
    document.removeEventListener('focusout', blur);
    document.removeEventListener('click', click);
    document.removeEventListener('keydown', key);
    document.removeEventListener('scroll', position, true);
    win.removeEventListener('resize', position);
  };
}
