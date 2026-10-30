export interface MotionUnit {
  element: HTMLElement | SVGElement;
  step: number;
  landscape?: boolean;
}

const running = new Set<Animation>();
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function units(
  elements: Element[],
  steps?: (element: Element, index: number) => number,
): MotionUnit[] {
  const candidates = new Set(elements);
  return elements
    .filter((element) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) return false;
      if (!element.getClientRects().length || element.closest('[hidden]')) return false;
      let parent = element.parentElement;
      while (parent) {
        if (candidates.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    })
    .map((element, index) => ({
      element: element as HTMLElement | SVGElement,
      landscape: element.matches('svg, .terrain, .landscape'),
      step: steps?.(element, index) ?? index,
    }));
}

export function chapterMotionUnits(panel: HTMLElement): MotionUnit[] {
  return units(
    [
      ...panel.querySelectorAll(
        '[data-reveal], .study-atlas, .study-mountain-lines, .journey-featured > header, .featured-pin',
      ),
    ],
    (element, index) => {
      if (element.matches('svg')) return 0;
      if (element.matches('.journey-chapter-marker')) return 1;
      if (element.matches('.study-atlas')) return 3;
      if (element.matches('.featured-pin')) return 3 + index;
      return Number((element as HTMLElement).dataset.step ?? 3);
    },
  );
}

export function pageMotionUnits(): MotionUnit[] {
  const main = document.getElementById('main-content');
  if (!main) return [];
  let result: MotionUnit[];
  if (main.matches('[data-journey]')) {
    const bookmarked = document
      .getElementById(location.hash.slice(1))
      ?.closest<HTMLElement>('.snowline-panel');
    const panel =
      (bookmarked && main.contains(bookmarked) ? bookmarked : null) ??
      main.querySelector<HTMLElement>('.snowline-panel.is-active') ??
      main.querySelector<HTMLElement>('.snowline-panel');
    result = panel ? chapterMotionUnits(panel) : [];
  } else if (main.matches('.welcome')) {
    result = units(
      [
        ...main.querySelectorAll(
          '.landscape, .welcome-header, .host, .welcome-overline, h1, .lede, .divider, .choice, .footnote, .welcome-footer',
        ),
      ],
      (element, index) => (element.matches('.landscape') ? 0 : index + 1),
    );
  } else {
    const expand = (element: Element): Element[] => {
      if (
        element.matches(
          'header, .reader-layout, .people-layout, .archive-layout, .tool-layout, .reader-main, .reader-body, .profile-intro, .friends-ascent, .friends-steps',
        ) ||
        getComputedStyle(element).display === 'contents'
      ) {
        return [...element.children].flatMap(expand);
      }
      return [element];
    };
    const elements = [...main.children].flatMap(expand);
    result = units(elements);
  }
  const overlays = [...document.querySelectorAll('dialog[open], [popover]')].filter(
    (element) => element.matches('dialog[open]') || element.matches(':popover-open'),
  );
  result.push(...units(overlays));
  return result.filter(({ element }) => {
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight;
  });
}

export function animateMotion(
  targets: MotionUnit[],
  phase: 'enter' | 'exit',
  initialDelay = 0,
): Animation[] {
  if (reduced()) return [];
  const ranks = [...new Set(targets.map((unit) => unit.step))].sort((a, b) => a - b);
  const animations = targets.map(({ element, step, landscape }) => {
    const style = getComputedStyle(element);
    const opacity = style.opacity;
    const translate = style.translate === 'none' ? '0 0' : style.translate;
    const rank = ranks.indexOf(step);
    const entering = phase === 'enter';
    const frames = entering
      ? [
          { opacity: 0, translate: landscape ? '0 6px' : '0 16px' },
          { opacity, translate },
        ]
      : [
          { opacity, translate },
          { opacity: 0, translate: landscape ? translate : '0 -8px' },
        ];
    const animation = element.animate(frames, {
      duration: entering ? (landscape ? 560 : 460) : 170,
      delay: initialDelay + Math.min(rank * (entering ? 50 : 24), entering ? 300 : 144),
      easing: entering ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.4,0,1,1)',
      fill: 'both',
    });
    running.add(animation);
    void animation.finished
      .then(() => {
        if (entering) {
          running.delete(animation);
          animation.cancel();
        }
      })
      .catch(() => running.delete(animation));
    return animation;
  });
  if (phase === 'enter') {
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      // Recalculate scene tethers only after every staggered element has settled.
      const panels = new Set(targets.map(({ element }) => element.closest('.snowline-panel')));
      panels.forEach((panel) => {
        if (panel?.classList.contains('is-active'))
          panel.dispatchEvent(new Event('journey:revealed'));
      });
    });
  }
  return animations;
}

export function resetMotion() {
  running.forEach((animation) => animation.cancel());
  running.clear();
}

export function cancelMotion(animations: Animation[]) {
  animations.forEach((animation) => {
    running.delete(animation);
    animation.cancel();
  });
}
