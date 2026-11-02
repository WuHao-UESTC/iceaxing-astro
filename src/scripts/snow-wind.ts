export function createSnowWind(home: HTMLElement, reduced: MediaQueryList) {
  const layer = home.querySelector<HTMLElement>('[data-snow-wind]');
  let animations: Animation[] = [];
  let generation = 0;
  const cancel = () => {
    animations.forEach((a) => a.cancel());
    animations = [];
  };
  const play = (element: Element, frames: Keyframe[], duration: number, delay = 0) => {
    const a = element.animate(frames, {
      duration,
      delay,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'both',
    });
    animations.push(a);
    return a;
  };
  reduced.addEventListener('change', () => {
    generation++;
    cancel();
    home.querySelectorAll<HTMLElement>('.snowline-panel').forEach((p) => {
      p.hidden = !p.classList.contains('is-active');
      p.inert = p.hidden;
    });
    home.removeAttribute('data-wind-running');
  });
  return {
    show(
      from: HTMLElement,
      to: HTMLElement,
      panels: HTMLElement[],
      direction: number,
      animate: boolean,
    ) {
      const token = ++generation;
      cancel();
      panels.forEach((p) => {
        p.hidden = p !== to && p !== from;
        p.inert = p !== to;
        p.classList.toggle('is-active', p === to);
      });
      to.hidden = false;
      to.inert = false;
      home.removeAttribute('data-wind-running');
      if (!animate || reduced.matches) {
        panels.forEach((p) => {
          p.hidden = p !== to;
        });
        return;
      }
      home.dataset.windRunning = 'true';
      if (from !== to)
        play(
          from,
          [
            { opacity: 1, transform: 'translateX(0)' },
            { opacity: 0, transform: `translate(${direction * -13}%, -8px)` },
          ],
          240,
        );
      const arrival = play(
        to,
        [
          { opacity: 0, transform: `translate(${direction * 18}%, 6px)` },
          { opacity: 1, transform: 'translate(0,0)' },
        ],
        380,
        100,
      );
      to.querySelectorAll<HTMLElement>(
        '.journey-chapter-heading,.editorial-masthead,.journey-chapter-marker,.editorial-selection-header',
      ).forEach((el, i) =>
        play(
          el,
          [
            { opacity: 0, transform: `translateX(${direction * 18}px)` },
            { opacity: 1, transform: 'translateX(0)' },
          ],
          260,
          110 + Math.min(i, 3) * 35,
        ),
      );
      layer?.querySelectorAll('i').forEach((el, i) =>
        play(
          el,
          [
            { opacity: 0, transform: `translate(${direction * 45}vw, 12px) scaleX(.2)` },
            { opacity: 0.55, offset: 0.2 },
            { opacity: 0, transform: `translate(${direction * -60}vw, -28px) scaleX(1.6)` },
          ],
          360,
          (i % 7) * 18,
        ),
      );
      void arrival.finished
        .then(() => {
          if (token !== generation) return;
          panels.forEach((p) => {
            p.hidden = p !== to;
          });
          cancel();
          home.removeAttribute('data-wind-running');
        })
        .catch(() => {});
    },
  };
}
