const chapterIds = ['base-camp', 'technical-ridge', 'snowfield-traverse', 'night-camp'] as const;

export function initHomeJourney() {
  const home = document.querySelector<HTMLElement>('[data-journey]');
  if (!home) return;
  const panels = chapterIds
    .map((id) => document.getElementById(id))
    .filter((panel): panel is HTMLElement => Boolean(panel));
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-journey-link]')];
  const hero = document.querySelector<HTMLElement>('.snowline-hero');
  const heroRoutes = [...document.querySelectorAll<HTMLAnchorElement>('[data-hero-route]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const visited = new WeakSet<HTMLElement>();
  document.documentElement.classList.add('journey-enhanced');

  const scrollLists = [...home.querySelectorAll<HTMLElement>('[data-scroll-list]')];
  const updateScrollList = (list: HTMLElement) => {
    const controlButton = home.querySelector<HTMLButtonElement>(
      `[data-scroll-target="${CSS.escape(list.id)}"]`,
    );
    const controls = controlButton?.closest<HTMLElement>('[data-scroll-controls]');
    const overflowing = list.scrollHeight > list.clientHeight + 2;
    if (controls) controls.hidden = !overflowing;
    controls?.querySelectorAll<HTMLButtonElement>('[data-scroll-direction]').forEach((button) => {
      const atStart = list.scrollTop <= 1;
      const atEnd = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
      button.disabled = button.dataset.scrollDirection === 'up' ? atStart : atEnd;
    });
  };

  scrollLists.forEach((list) => {
    if (!list.id) return;
    updateScrollList(list);
    list.addEventListener('scroll', () => updateScrollList(list), { passive: true });
    new ResizeObserver(() => updateScrollList(list)).observe(list);
  });

  home.querySelectorAll<HTMLButtonElement>('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const list = document.getElementById(button.dataset.scrollTarget ?? '');
      if (!list) return;
      const direction = button.dataset.scrollDirection === 'up' ? -1 : 1;
      list.scrollBy({
        top: direction * Math.max(80, list.clientHeight * 0.72),
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    });
  });

  function activate(panel: HTMLElement, animate = true) {
    const firstVisit = !visited.has(panel);
    visited.add(panel);
    panels.forEach((item) => item.classList.toggle('is-active', item === panel));
    links.forEach((link) => {
      const active = link.dataset.journeyLink === panel.id;
      link.parentElement?.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (location.hash !== `#${panel.id}`) history.replaceState(history.state, '', `#${panel.id}`);
    if (animate && firstVisit && !reducedMotion.matches) {
      panel.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        element.animate(
          [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: element.dataset.reveal === 'landscape' ? 680 : 440,
            delay: Math.min(Number(element.dataset.step ?? 0) * 55, 280),
            easing: 'cubic-bezier(.22,1,.36,1)',
          },
        );
      });
      panel.querySelector<SVGPathElement>('.landscape-line')?.animate(
        [
          { strokeDasharray: '1', strokeDashoffset: '1' },
          { strokeDasharray: '1', strokeDashoffset: '0' },
        ],
        { duration: 750, easing: 'ease-out' },
      );
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target as HTMLElement);
    },
    { root: home, threshold: [0.45, 0.65] },
  );
  panels.forEach((panel) => observer.observe(panel));

  function navigate(hash: string, smooth: boolean) {
    const target = document.getElementById(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
    const panel = target.closest<HTMLElement>('.snowline-panel');
    if (panel) activate(panel, smooth);
    target.querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true });
  }

  home.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const hash = decodeURIComponent(link.hash.slice(1));
    if (!document.getElementById(hash)) return;
    event.preventDefault();
    history.pushState(history.state, '', `#${hash}`);
    navigate(hash, true);
  });

  heroRoutes.forEach((link) => {
    const highlight = () => {
      hero?.setAttribute('data-route-highlight', link.dataset.heroRoute ?? '');
    };
    const clear = () => hero?.removeAttribute('data-route-highlight');
    link.addEventListener('pointerenter', highlight);
    link.addEventListener('pointerleave', clear);
    link.addEventListener('focus', highlight);
    link.addEventListener('blur', clear);
  });
  window.addEventListener('hashchange', () => navigate(location.hash.slice(1), true));

  const initial = location.hash.slice(1);
  if (initial && document.getElementById(initial))
    requestAnimationFrame(() => navigate(initial, false));
  else if (panels[0]) activate(panels[0], false);
}
