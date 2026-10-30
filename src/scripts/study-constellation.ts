export function initStudyConstellation() {
  document.querySelectorAll<HTMLElement>('[data-constellation]').forEach((root) => {
    const atlas = root.querySelector<HTMLElement>('[data-atlas]')!;
    const world = root.querySelector<HTMLElement>('[data-star-world]')!;
    const map = root.querySelector<HTMLElement>('.study-star-map')!;
    const stage = root.querySelector<HTMLElement>('.study-atlas-stage')!;
    const detail = root.querySelector<HTMLElement>('[data-star-detail]')!;
    const reset = root.querySelector<HTMLButtonElement>('[data-star-reset]')!;
    const switcher = root.querySelector<HTMLElement>('[data-star-switch]')!;
    const select = root.querySelector<HTMLSelectElement>('[data-star-select]')!;
    const status = root.querySelector<HTMLElement>('[data-star-status]')!;
    const invitation = root.querySelector<HTMLElement>('[data-star-invitation]')!;
    const stars = [...root.querySelectorAll<HTMLAnchorElement>('[data-star]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[data-topic]')];
    const connections = [...root.querySelectorAll<SVGLineElement>('[data-star-edge-from]')];
    let selected: HTMLAnchorElement | undefined;

    function preserveJourneyScroll() {
      const journey = root.closest<HTMLElement>('[data-journey]');
      const top = journey?.scrollTop;
      return () => {
        if (!journey || top === undefined) return;
        journey.scrollTo({ top, behavior: 'instant' });
        requestAnimationFrame(() => journey.scrollTo({ top, behavior: 'instant' }));
      };
    }

    function updateCrop() {
      // Keep the full canvas independent of the width of its clipping viewport.
      const compact = matchMedia('(max-width: 48rem)').matches;
      world.style.width = `${root.clientWidth * (compact ? 1 : 0.88)}px`;
      world.style.setProperty(
        '--star-world-height',
        `${compact ? stage.clientHeight : root.clientHeight}px`,
      );
      if (!selected || !atlas.classList.contains('is-focused')) return;
      const width = world.clientWidth;
      const height = world.clientHeight;
      const viewportWidth = map.clientWidth;
      world.style.setProperty(
        '--star-pan-x',
        `${viewportWidth * 0.5 - (Number(selected.dataset.starX) / 100) * width}px`,
      );
      world.style.setProperty(
        '--star-pan-y',
        `${map.clientHeight * 0.46 - (Number(selected.dataset.starY) / 100) * height}px`,
      );
    }

    function choose(id: string, moveFocus = false) {
      const star = stars.find((item) => item.dataset.star === id);
      const panel = panels.find((item) => item.dataset.topic === id);
      if (!star || !panel) return;
      const restoreScroll = preserveJourneyScroll();
      selected = star;
      connections.forEach((line) =>
        line.classList.toggle(
          'is-near-selected',
          line.dataset.starEdgeFrom === id || line.dataset.starEdgeTo === id,
        ),
      );
      panels.forEach((item) => {
        item.hidden = item !== panel;
      });
      stars.forEach((item) => {
        const active = item === star;
        item.classList.toggle('is-selected', active);
        item.setAttribute('aria-expanded', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      detail.hidden = false;
      reset.hidden = false;
      switcher.hidden = false;
      invitation.hidden = true;
      select.value = id;
      atlas.classList.add('is-focused');
      updateCrop();
      status.textContent = star.getAttribute('aria-label');
      if (moveFocus) panel.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
      restoreScroll();
    }

    function overview() {
      const restoreScroll = preserveJourneyScroll();
      atlas.classList.remove('is-focused');
      connections.forEach((line) => line.classList.remove('is-near-selected', 'is-hovered'));
      world.style.removeProperty('--star-pan-x');
      world.style.removeProperty('--star-pan-y');
      detail.hidden = true;
      panels.forEach((panel) => {
        panel.hidden = true;
      });
      reset.hidden = true;
      switcher.hidden = true;
      invitation.hidden = false;
      stars.forEach((star) => {
        star.classList.remove('is-selected');
        star.setAttribute('aria-expanded', 'false');
        star.tabIndex = 0;
      });
      select.value = '';
      status.textContent = '';
      selected?.focus({ preventScroll: true });
      restoreScroll();
    }

    stars.forEach((star) => {
      const highlight = (active: boolean) => {
        connections.forEach((line) => {
          line.classList.toggle(
            'is-hovered',
            active &&
              (line.dataset.starEdgeFrom === star.dataset.star ||
                line.dataset.starEdgeTo === star.dataset.star),
          );
        });
      };
      star.addEventListener('pointerenter', () => highlight(true));
      star.addEventListener('pointerleave', () => highlight(false));
      star.addEventListener('focus', () => highlight(true));
      star.addEventListener('blur', () => highlight(false));
      star.setAttribute('aria-controls', `study-topic-${star.dataset.star}`);
      star.setAttribute('aria-expanded', 'false');
      star.addEventListener('click', (event) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        choose(star.dataset.star!, event.detail === 0);
      });
    });
    reset.addEventListener('click', overview);
    select.addEventListener('change', () => {
      if (select.value) choose(select.value);
      else overview();
    });
    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && atlas.classList.contains('is-focused')) {
        event.preventDefault();
        event.stopPropagation();
        overview();
      }
    });
    const resizeObserver = new ResizeObserver(updateCrop);
    resizeObserver.observe(root);
    resizeObserver.observe(stage);
    updateCrop();
    atlas.classList.add('is-enhanced');
  });
}
