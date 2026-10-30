import { animateMotion, chapterMotionUnits, resetMotion } from './motion';

const DURATION = 860;
const EASING = 'cubic-bezier(.65,0,.25,1)';

/** Option C: reveal a stationary canvas along a low-poly ridge. */
export function createChapterTransition(
  home: HTMLElement,
  panels: HTMLElement[],
  current: () => HTMLElement | null,
  commit: (panel: HTMLElement) => void,
) {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let running = false;
  let queued: HTMLElement | null = null;
  let transition: ViewTransition | undefined;
  let animations: Animation[] = [];
  let interrupted = false;
  home.classList.add('has-facet-transitions');

  const mask = (x: number, forward: boolean) =>
    forward
      ? `polygon(100% 0,100% 100%,${x - 6}% 100%,${x + 2}% 80%,${x - 5}% 58%,${x + 6}% 37%,${x - 3}% 16%,${x}% 0)`
      : `polygon(0 0,0 100%,${x + 6}% 100%,${x - 2}% 80%,${x + 5}% 58%,${x - 6}% 37%,${x + 3}% 16%,${x}% 0)`;

  const visibleText = (panel: HTMLElement) => {
    const bounds = home.getBoundingClientRect();
    return chapterMotionUnits(panel).filter(({ element, landscape }) => {
      const box = element.getBoundingClientRect();
      return !landscape && box.bottom > bounds.top && box.top < bounds.bottom;
    });
  };

  async function turn(panel: HTMLElement) {
    const previous = current();
    if (panel === previous) return;
    if (reduced.matches || !previous) {
      commit(panel);
      panel.dispatchEvent(new Event('journey:revealed'));
      return;
    }
    running = true;
    interrupted = false;
    home.setAttribute('data-chapter-transition', '');
    home.dispatchEvent(new Event('journey:changing'));
    resetMotion();
    const forward = panels.indexOf(panel) > panels.indexOf(previous);
    const savedNames = new Map<HTMLElement | SVGElement, string>();
    const name = (element: HTMLElement | SVGElement, value: string) => {
      if (!savedNames.has(element)) savedNames.set(element, element.style.viewTransitionName);
      element.style.viewTransitionName = value;
    };
    const restore = () => {
      savedNames.forEach((value, element) => (element.style.viewTransitionName = value));
      savedNames.clear();
    };
    let seam: SVGSVGElement | undefined;
    let styles: HTMLStyleElement | undefined;
    try {
      if (typeof document.startViewTransition === 'function') {
        root.classList.add('journey-facet-turn');
        const outgoing = visibleText(previous);
        outgoing.forEach(({ element }, index) => name(element, `journey-out-${index}`));
        let incoming: ReturnType<typeof visibleText> = [];
        transition = document.startViewTransition(() => {
          restore();
          commit(panel);
          incoming = visibleText(panel);
          incoming.forEach(({ element }, index) => name(element, `journey-in-${index}`));
          const box = home.getBoundingClientRect();
          seam = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          seam.setAttribute('viewBox', '0 0 100 100');
          seam.setAttribute('preserveAspectRatio', 'none');
          seam.setAttribute('aria-hidden', 'true');
          seam.classList.add('journey-facet-seam');
          Object.assign(seam.style, {
            left: `${box.left}px`,
            top: `${box.top}px`,
            width: `${box.width}px`,
            height: `${home.clientHeight}px`,
            color: getComputedStyle(panel).getPropertyValue('--scene-accent'),
          });
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          line.setAttribute(
            'points',
            forward ? '50,0 47,16 56,37 45,58 52,80 44,100' : '50,0 53,16 44,37 55,58 48,80 56,100',
          );
          line.setAttribute('vector-effect', 'non-scaling-stroke');
          seam.append(line);
          home.append(seam);
          styles = document.createElement('style');
          styles.textContent = [
            ...outgoing.map((_, i) => `::view-transition-group(journey-out-${i}){z-index:2}`),
            ...incoming.map((_, i) => `::view-transition-group(journey-in-${i}){z-index:3}`),
          ].join('\n');
          document.head.append(styles);
        });
        await transition.ready;
        if (!interrupted) {
          const animate = (
            pseudoElement: string,
            frames: Keyframe[],
            options: KeyframeAnimationOptions,
          ) => {
            const animation = root.animate(frames, { ...options, pseudoElement, fill: 'both' });
            animations.push(animation);
          };
          animate(
            '::view-transition-new(journey-canvas)',
            [
              { clipPath: mask(forward ? 112 : -12, forward) },
              { clipPath: mask(forward ? -12 : 112, forward) },
            ],
            { duration: DURATION, easing: EASING },
          );
          animate(
            '::view-transition-new(journey-seam)',
            [
              { transform: `translateX(${forward ? 62 : -62}%)`, opacity: 0 },
              { opacity: 1, offset: 0.16 },
              { opacity: 1, offset: 0.84 },
              { transform: `translateX(${forward ? -62 : 62}%)`, opacity: 0 },
            ],
            { duration: DURATION, easing: EASING },
          );
          outgoing.forEach((_, index) =>
            animate(
              `::view-transition-old(journey-out-${index})`,
              [{ opacity: 1 }, { opacity: 0 }],
              { duration: DURATION * 0.24, easing: 'ease-out' },
            ),
          );
          const ranks = [...new Set(incoming.map(({ step }) => step))].sort((a, b) => a - b);
          incoming.forEach(({ step }, index) =>
            animate(
              `::view-transition-new(journey-in-${index})`,
              [
                { opacity: 0, transform: 'translateY(6px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              {
                duration: DURATION * 0.4,
                delay: DURATION * (0.43 + Math.min(ranks.indexOf(step), 3) * 0.045),
                easing: 'cubic-bezier(.22,1,.36,1)',
              },
            ),
          );
        }
        await transition.finished;
      } else {
        // Older browsers retain the same navigation, with a live polygon reveal.
        commit(panel);
        animations = [
          panel.animate(
            [
              { clipPath: mask(forward ? 112 : -12, forward) },
              { clipPath: mask(forward ? -12 : 112, forward) },
            ],
            { duration: DURATION, easing: EASING },
          ),
          ...animateMotion(visibleText(panel), 'enter', 300),
        ];
        await Promise.allSettled(animations.map((animation) => animation.finished));
      }
    } catch {
      // A resize or competing document transition may skip the snapshots.
      transition?.skipTransition();
      if (transition) await transition.updateCallbackDone.catch(() => {});
      if (current() !== panel) commit(panel);
    } finally {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      restore();
      seam?.remove();
      styles?.remove();
      root.classList.remove('journey-facet-turn');
      home.removeAttribute('data-chapter-transition');
      transition = undefined;
      running = false;
      current()?.dispatchEvent(new Event('journey:revealed'));
      const next = queued;
      queued = null;
      if (next && !interrupted) void turn(next);
    }
  }

  const cancel = () => {
    queued = null;
    interrupted = true;
    transition?.skipTransition();
    animations.forEach((animation) => animation.cancel());
  };
  reduced.addEventListener('change', cancel);
  window.addEventListener('resize', cancel);
  window.addEventListener('pagehide', cancel);
  document.addEventListener('page:leaving-start', cancel);
  return {
    get running() {
      return running;
    },
    request(panel: HTMLElement) {
      if (running) queued = panel;
      else void turn(panel);
    },
    cancel,
  };
}
