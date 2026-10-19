export function initArticleReader() {
  const reader = document.querySelector<HTMLElement>('[data-reader]');
  const body = reader?.querySelector<HTMLElement>('[data-reader-body]');
  if (!reader || !body || reader.dataset.readerReady === 'true') return;
  reader.dataset.readerReady = 'true';

  const outline = reader.querySelector<HTMLDetailsElement>('[data-reader-toc]');
  const links = [...reader.querySelectorAll<HTMLAnchorElement>('.reader-toc a[href^="#"]')];
  const sections = links.flatMap((link) => {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    return heading ? [{ heading, link }] : [];
  });
  const progress = reader.querySelector<HTMLProgressElement>('[data-reader-progress]');
  const percent = reader.querySelector<HTMLOutputElement>('[data-reader-percent]');
  const line = reader.querySelector<HTMLElement>('[data-reader-line]');
  const compact = matchMedia('(max-width: 56rem)');
  const setOutline = () => {
    if (outline) outline.open = !compact.matches;
  };
  setOutline();
  compact.addEventListener('change', setOutline);
  outline?.addEventListener('click', (event) => {
    if (compact.matches && (event.target as Element).closest('a[href^="#"]')) outline.open = false;
  });
  reader.querySelector<HTMLElement>('[data-reader-progress-info]')?.removeAttribute('hidden');

  let scheduled = false;
  let current: HTMLAnchorElement | undefined;
  const update = () => {
    scheduled = false;
    const offset = 100;
    const bounds = body.getBoundingClientRect();
    const start = bounds.top + window.scrollY - offset;
    const end = Math.max(start + 1, bounds.bottom + window.scrollY - window.innerHeight);
    const amount = Math.max(0, Math.min(100, ((window.scrollY - start) / (end - start)) * 100));
    const value = Math.round(amount);
    if (progress) {
      progress.value = value;
      progress.textContent = value + '%';
    }
    if (percent) percent.value = value + '%';
    line?.style.setProperty('--reader-progress', amount + '%');

    let active = sections[0]?.link;
    for (const section of sections) {
      if (section.heading.getBoundingClientRect().top > offset + 16) break;
      active = section.link;
    }
    if (active !== current) {
      current?.removeAttribute('aria-current');
      active?.setAttribute('aria-current', 'location');
      current = active;
      const nav = outline?.querySelector<HTMLElement>('nav');
      if (
        active &&
        nav &&
        outline?.open &&
        !compact.matches &&
        !nav.matches(':hover, :focus-within')
      ) {
        const navBounds = nav.getBoundingClientRect();
        const activeBounds = active.getBoundingClientRect();
        if (activeBounds.top < navBounds.top || activeBounds.bottom > navBounds.bottom) {
          nav.scrollTop += activeBounds.top - navBounds.top - nav.clientHeight / 3;
        }
      }
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  // Images, embeds and diagrams can change the reading distance after hydration.
  new ResizeObserver(schedule).observe(body);
  update();
}
