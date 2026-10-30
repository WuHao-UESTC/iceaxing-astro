import { animateMotion, pageMotionUnits, resetMotion } from './motion';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let navigating = false;

function enter() {
  root.dataset.pageMotion = 'ready';
  delete root.dataset.pageLeaving;
  navigating = false;
  resetMotion();
  const targets = pageMotionUnits();
  animateMotion(targets, 'enter');
  delete root.dataset.pageEnterPending;
}

requestAnimationFrame(enter);

document.addEventListener('click', (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  const link =
    event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
  if (
    !link ||
    link.hasAttribute('download') ||
    (link.target && link.target !== '_self') ||
    link.closest('[data-no-page-motion]')
  )
    return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  if (
    /^\/(?:api|keystatic)(?:\/|$)/.test(url.pathname) ||
    /\.(?!html?$)[a-z\d]{1,8}$/i.test(url.pathname)
  )
    return;
  if (reduced.matches) return;
  event.preventDefault();
  if (navigating) return;
  navigating = true;
  document.dispatchEvent(new Event('page:leaving-start'));
  root.dataset.pageLeaving = 'true';
  const animations = animateMotion(pageMotionUnits(), 'exit');
  // A short, bounded exit preserves ordinary document navigation and all page scripts.
  void Promise.race([
    Promise.allSettled(animations.map((animation) => animation.finished)),
    new Promise((resolve) => window.setTimeout(resolve, 400)),
  ]).then(() => {
    document.dispatchEvent(new Event('page:leaving'));
    document
      .querySelectorAll<HTMLDialogElement>('dialog[open]')
      .forEach((dialog) => dialog.close());
    location.assign(url.href);
  });
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) requestAnimationFrame(enter);
});
reduced.addEventListener('change', () => {
  resetMotion();
  delete root.dataset.pageEnterPending;
});
