const chapterIds = [
  'base-camp',
  'technical-ridge',
  'study-terrace',
  'snowfield-traverse',
  'night-camp',
] as const;

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

  home.querySelectorAll<HTMLElement>('[data-life-carousel]').forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('.life-landings');
    let pages = [...carousel.querySelectorAll<HTMLElement>('[data-life-page]')];
    const landings = [...carousel.querySelectorAll<HTMLElement>('.life-landing')];
    const mobile = matchMedia('(max-width: 48rem)');
    const controls = carousel.querySelector<HTMLElement>('[data-life-controls]');
    if (!track) return;
    let current = 0;
    const tethers = carousel.querySelector<SVGSVGElement>('[data-life-tethers]');
    const landscape = carousel
      .closest('.snowline-panel')
      ?.querySelector<SVGSVGElement>('.life-library-landscape');
    const drawTethers = () => {
      if (!tethers || !landscape) return;
      const edge = landscape.querySelector<SVGPolylineElement>(
        `[data-rift-edge="${mobile.matches ? 'mobile' : 'desktop'}"]`,
      );
      const matrix = edge?.getScreenCTM();
      if (!edge || !matrix) return;
      const bounds = carousel.getBoundingClientRect();
      tethers.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      tethers.replaceChildren();
      const append = (parent: SVGElement, tag: string, attributes: Record<string, string>) => {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        parent.append(element);
        return element;
      };
      pages[current]?.querySelectorAll<HTMLElement>('.life-landing').forEach((landing) => {
        const box = (
          landing.querySelector<HTMLElement>('.life-landing-link') ?? landing
        ).getBoundingClientRect();
        const point = landscape.createSVGPoint();
        point.x = box.left + 1;
        point.y = box.bottom;
        const local = point.matrixTransform(matrix.inverse());
        for (let i = 1; i < edge.points.numberOfItems; i++) {
          const a = edge.points.getItem(i - 1);
          const b = edge.points.getItem(i);
          if (local.x < a.x || local.x > b.x) continue;
          point.x = local.x;
          point.y = a.y + ((local.x - a.x) / (b.x - a.x)) * (b.y - a.y);
          const ground = point.matrixTransform(matrix).y - bounds.top;
          const x = box.left + 1 - bounds.left;
          const y = box.bottom + 5 - bounds.top;
          const width = box.width - 2;
          const group = append(tethers, 'g', {
            'data-rift-anchor': '',
            'data-drop': String(ground - y),
          });
          append(group, 'path', {
            class: 'life-tether-line',
            d: `M${x} ${ground - 5}V${y}H${x + width * 0.29}L${x + width * 0.43} ${y - 4}L${x + width * 0.68} ${y + 4}L${x + width} ${y - 1}`,
          });
          const angle =
            (Math.atan2((b.y - a.y) * matrix.d, (b.x - a.x) * matrix.a) * 180) / Math.PI;
          const stone = append(group, 'g', {
            class: 'life-anchor-stone',
            transform: `translate(${x} ${ground + 1}) rotate(${angle})`,
          });
          append(stone, 'path', {
            class: 'life-anchor-stone-body',
            d: 'M-9 1C-9-3-5-6-1-5C4-6 9-2 10 1C11 4 5 6 0 6C-5 6-10 5-9 1Z',
          });
          append(stone, 'path', {
            class: 'life-anchor-stone-light',
            d: 'M-5-1Q-2-4 3-2',
          });
          break;
        }
      });
    };
    const update = () => {
      current = Math.max(
        0,
        Math.min(pages.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))),
      );
      pages.forEach((page, index) => {
        page.inert = index !== current;
      });
      const status = carousel.querySelector<HTMLElement>('[data-life-status]');
      if (status) status.textContent = `${current + 1} / ${pages.length}`;
      controls?.querySelectorAll<HTMLButtonElement>('[data-life-direction]').forEach((button) => {
        button.disabled =
          Number(button.dataset.lifeDirection) < 0 ? current === 0 : current === pages.length - 1;
      });
      drawTethers();
    };
    const regroup = () => {
      const size = mobile.matches ? 2 : 4;
      const first = current * (pages[0]?.children.length || size);
      track.replaceChildren();
      pages = [];
      for (let i = 0; i < landings.length; i += size) {
        const page = document.createElement('div');
        page.className = 'life-landing-page';
        page.dataset.lifePage = '';
        landings.slice(i, i + size).forEach((landing, index) => {
          landing.className = `life-landing life-landing-${index}`;
          page.append(landing);
        });
        track.append(page);
        pages.push(page);
      }
      current = Math.min(Math.floor(first / size), Math.max(0, pages.length - 1));
      if (controls) controls.hidden = pages.length < 2;
      track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' });
      update();
    };
    regroup();
    mobile.addEventListener('change', regroup);
    controls?.querySelectorAll<HTMLButtonElement>('[data-life-direction]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = Math.max(
          0,
          Math.min(pages.length - 1, current + Number(button.dataset.lifeDirection)),
        );
        track.scrollTo({
          left: next * track.clientWidth,
          behavior: reducedMotion.matches ? 'auto' : 'smooth',
        });
      });
    });
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(() => {
      track.scrollTo({ left: current * track.clientWidth, behavior: 'instant' });
      update();
    }).observe(track);
    update();
    const landingObserver = new ResizeObserver(drawTethers);
    landings.forEach((landing) => landingObserver.observe(landing));
    void document.fonts.ready.then(drawTethers);
    carousel.closest('.snowline-panel')?.addEventListener('journey:revealed', drawTethers);
  });

  const scrollLists = [...home.querySelectorAll<HTMLElement>('[data-scroll-list]')];
  const updateScrollList = (list: HTMLElement) => {
    const controlButton = home.querySelector<HTMLButtonElement>(
      `[data-scroll-target="${CSS.escape(list.id)}"]`,
    );
    const controls = controlButton?.closest<HTMLElement>('[data-scroll-controls]');
    const horizontal = list.dataset.scrollAxis === 'x';
    const overflowing = horizontal
      ? list.scrollWidth > list.clientWidth + 2
      : list.scrollHeight > list.clientHeight + 2;
    if (controls) controls.hidden = !overflowing;
    controls?.querySelectorAll<HTMLButtonElement>('[data-scroll-direction]').forEach((button) => {
      const atStart = horizontal ? list.scrollLeft <= 1 : list.scrollTop <= 1;
      const atEnd = horizontal
        ? list.scrollLeft + list.clientWidth >= list.scrollWidth - 1
        : list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
      button.disabled = ['up', 'left'].includes(button.dataset.scrollDirection ?? '')
        ? atStart
        : atEnd;
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
      const horizontal = list.dataset.scrollAxis === 'x';
      const direction = ['up', 'left'].includes(button.dataset.scrollDirection ?? '') ? -1 : 1;
      list.scrollBy({
        left: horizontal ? direction * Math.max(160, list.clientWidth * 0.82) : 0,
        top: horizontal ? 0 : direction * Math.max(80, list.clientHeight * 0.72),
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
        const animation = element.animate(
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
        if (element.dataset.reveal === 'landscape') {
          void animation.finished
            .then(() => panel.dispatchEvent(new Event('journey:revealed')))
            .catch(() => {});
        }
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

  // A chapter taller than the viewport must fall back to proximity snapping,
  // otherwise readers get stuck at its first screen.
  const syncPanelOverflow = () => {
    home.toggleAttribute(
      'data-panel-overflow',
      panels.some((panel) => panel.offsetHeight > home.clientHeight + 1),
    );
  };
  syncPanelOverflow();
  const panelObserver = new ResizeObserver(syncPanelOverflow);
  panelObserver.observe(home);
  panels.forEach((panel) => panelObserver.observe(panel));

  // CSS mandatory snapping swallows a wheel notch while it pulls the page back
  // to the current chapter. Drive pointer scrolling here instead: the distance
  // travelled by a gesture decides how many chapters to move, nested scrollers
  // keep their own scrolling, and chapters taller than the viewport scroll
  // normally until their edge.
  const WHEEL_MIN_INTENT = 16;
  const WHEEL_REARM_GAP = 180;
  const wheelState = {
    active: false,
    startIndex: 0,
    targetIndex: 0,
    direction: 0,
    distance: 0,
    lastWheel: 0,
    releaseTimer: 0,
  };
  const wheelDistance = (event: WheelEvent) => {
    if (event.deltaMode === 1) return event.deltaY * 16;
    if (event.deltaMode === 2) return event.deltaY * home.clientHeight;
    return event.deltaY;
  };
  const scrollableChild = (target: EventTarget | null, direction: number) => {
    let element = target instanceof Element ? target : null;
    while (element && element !== home) {
      if (element instanceof HTMLElement) {
        const overflowY = getComputedStyle(element).overflowY;
        if (
          /(auto|scroll|overlay)/.test(overflowY) &&
          element.scrollHeight > element.clientHeight + 1
        ) {
          const canContinue =
            direction > 0
              ? element.scrollTop + element.clientHeight < element.scrollHeight - 1
              : element.scrollTop > 1;
          if (canContinue) return element;
        }
      }
      element = element.parentElement;
    }
    return null;
  };
  const chapterIndexAt = (top: number) => {
    let index = panels.length - 1;
    while (index > 0 && (panels[index]?.offsetTop ?? 0) > top + 1) index--;
    return index;
  };
  const canTurnFrom = (direction: number) => {
    const top = home.scrollTop;
    const index = chapterIndexAt(top);
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= panels.length) return false;
    const panel = panels[index];
    if (!panel) return false;
    if (panel.offsetHeight > home.clientHeight + 1) {
      if (direction > 0 && top + home.clientHeight < panel.offsetTop + panel.offsetHeight - 2)
        return false;
      if (direction < 0 && top > panel.offsetTop + 2) return false;
    }
    return true;
  };
  const wheelPageStep = () => Math.max(100, home.clientHeight * 0.1);
  const pagesFor = (distance: number) =>
    Math.max(1, Math.round(Math.abs(distance) / wheelPageStep()));
  const releaseWheel = () => {
    wheelState.active = false;
    wheelState.startIndex = wheelState.targetIndex;
    wheelState.direction = 0;
    wheelState.distance = 0;
    window.clearTimeout(wheelState.releaseTimer);
  };
  const settleWheel = (delay: number) => {
    window.clearTimeout(wheelState.releaseTimer);
    wheelState.releaseTimer = window.setTimeout(releaseWheel, delay);
  };
  const resetUncommittedWheel = () => {
    if (wheelState.active) return;
    wheelState.direction = 0;
    wheelState.distance = 0;
  };
  const commitWheel = () => {
    if (!wheelState.direction) return;
    const target = Math.max(
      0,
      Math.min(
        panels.length - 1,
        wheelState.startIndex + wheelState.direction * pagesFor(wheelState.distance),
      ),
    );
    if (target === wheelState.targetIndex && wheelState.active) return;
    if (target === wheelState.startIndex) {
      resetUncommittedWheel();
      return;
    }
    wheelState.targetIndex = target;
    wheelState.active = true;
    home.scrollTo({
      top: panels[target]?.offsetTop ?? 0,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
    settleWheel(700);
  };
  window.addEventListener(
    'wheel',
    (event) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const target = event.target instanceof Element ? event.target : null;
      const insideHome = target ? home.contains(target) : false;
      const overPageChrome =
        !target ||
        target === document.body ||
        target === document.documentElement ||
        Boolean(target.closest('.site-header'));
      if (!insideHome && !overPageChrome) return;
      const distance = wheelDistance(event);
      if (!distance || Math.abs(event.deltaX) >= Math.abs(distance)) return;
      const direction = distance > 0 ? 1 : -1;
      const now = performance.now();

      if (!wheelState.active && scrollableChild(event.target, direction)) {
        resetUncommittedWheel();
        return;
      }
      if (!home.classList.contains('is-wheel-driven')) home.classList.add('is-wheel-driven');

      if (!wheelState.active) {
        const stale = wheelState.direction !== 0 && now - wheelState.lastWheel > WHEEL_REARM_GAP;
        if (wheelState.direction === 0 || stale || direction !== wheelState.direction) {
          if (!canTurnFrom(direction)) {
            resetUncommittedWheel();
            return;
          }
          wheelState.startIndex = chapterIndexAt(home.scrollTop);
          wheelState.targetIndex = wheelState.startIndex;
          wheelState.direction = direction;
          wheelState.distance = distance;
        } else {
          wheelState.distance += distance;
        }
        wheelState.lastWheel = now;
        if (Math.abs(wheelState.distance) < WHEEL_MIN_INTENT) return;
        event.preventDefault();
        commitWheel();
        return;
      }

      event.preventDefault();
      if (direction !== wheelState.direction) {
        wheelState.startIndex = wheelState.targetIndex;
        wheelState.direction = direction;
        wheelState.distance = distance;
      } else {
        wheelState.distance += distance;
      }
      wheelState.lastWheel = now;
      commitWheel();
      settleWheel(500);
    },
    { passive: false },
  );
  home.addEventListener(
    'scrollend',
    () => {
      if (wheelState.active) settleWheel(260);
    },
    { passive: true },
  );

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
    releaseWheel();
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
